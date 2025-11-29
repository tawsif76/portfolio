---
title: "From OpenStreetMap to ns-3: A Complete Guide to Realistic VANET Mobility"
date: "2025-10-03"
excerpt: "A detailed step-by-step workflow for taking real-world map data from OpenStreetMap, creating a complex traffic scenario in SUMO, and exporting mobility traces to ns-3."
tags: ["Simulation", "SUMO", "ns-3"]
image: "/images/blog/ns3.png"
---

For any researcher working in the VANET (Vehicular Ad-hoc Network) space, creating a realistic mobility simulation is the first crucial step. While network simulators like ns-3 are powerful, they don't inherently know how vehicles move in a real city. That’s where **SUMO** (Simulation of Urban MObility) comes in.

However, connecting SUMO with ns-3 can sometimes feel cumbersome. This guide provides a detailed, step-by-step workflow for taking real-world map data, creating a complex traffic scenario in SUMO, and finally, exporting that mobility information for use in your ns-3 simulation.

---

## Step 1: Installation and Setup on Ubuntu

First, let’s get the core tool installed. If you are running Debian or Ubuntu, SUMO is available in the regular repositories, but for research purposes, you generally want the latest stable version.

### Recommended Installation via PPA

Use the official SUMO PPA (Personal Package Archive) to ensure you aren't using outdated binaries.

```bash
sudo add-apt-repository ppa:sumo/stable
sudo apt-get update
sudo apt-get install sumo sumo-tools sumo-doc
```

### Verifying the Installation

On Ubuntu, these binaries are installed in `/usr/bin`, which is already in your system path. To confirm that SUMO is correctly set up and that your environment variables are ready, run:

```bash
echo $SUMO_HOME
```

If the output is `/usr/share/sumo`, you are good to go.

---

## Step 2: Getting Real-World Map Data

We need a realistic road network. The best source for this is **OpenStreetMap (OSM)**.

1.  Go to the [OSM website](https://www.openstreetmap.org) and search for your area of interest.
2.  Zoom in to select a specific portion (simulating an entire country is usually unnecessary and computationally heavy).
3.  Click the **Export** button to download the map as `map.osm`.

![OpenStreetMap Export Button](/images/blog/osm.png)

> **Note:** If you are trying to download a very large area, the standard export button might fail. In that case, you will need to download planet dumps from [planet.openstreetmap.org](https://planet.openstreetmap.org/).

---

## Step 3: Converting the Map for SUMO

You now have a raw map file (`.osm`), but SUMO cannot read it directly. We need to convert it into a `.net.xml` file using the `netconvert` tool.

We will use several flags to clean up the map and make it suitable for vehicle simulation:

- **`--remove-edges.by-vclass`**: SUMO provides many vehicle classes ([vClass](https://sumo.dlr.de/docs/Definition_of_Vehicles%2C_Vehicle_Types%2C_and_Routes.html)). Using this, we can remove roads that belong to certain vehicle classes and keep only the ones needed.
- `--tls.guess-signals`: Automatically detects where traffic lights should be.
- `--tls.default-type actuated`: Sets traffic lights to be adaptive rather than fixed-time.
- `--junctions.join`: Merges complicated, messy intersections into single, clean junctions.

Run the following command:

```bash
netconvert --osm-files map.osm \
           --output-file map.net.xml \
           --remove-edges.by-vclass bicycle,pedestrian,rail,truck \
           --tls.guess-signals \
           --tls.default-type actuated \
           --junctions.join
```

---

## Step 4: Generating Traffic

An empty road network needs vehicles. We can use the [`randomTrips`](https://sumo.dlr.de/docs/Tools/Trip.html) included with SUMO to generate random traffic. The `randomTrips.py` script is already available in your SUMO installation under: `/usr/share/sumo/tools`.

In random trip, a "trip" consists of a vehicle starting at an origin edge and driving to a destination edge at a specific time. To make this realistic, we need to apply a few specific settings:

1. **Fringe Factor (`--fringe-factor <value>`)**: By default, random trips may start from the center of the map, which can look unrealistic. The fringe factor increases the likelihood that vehicles start or end at the edges of the map. Higher values make border edges more likely to be chosen.
2. **Period (`--period <value>`)**: Controls traffic density by specifying how frequently vehicles are inserted into the network. SUMO will generate approximately **one vehicle every `<value>` seconds**.
3. **Validation (`--validate`)**: This ensures that the script doesn't create routes that are mathematically impossible to drive (e.g., disconnected roads).
4. **End Time (`-e <value>` or `--end <value>`)**: The **end time** defines how long the trip-generation process should run.

Run the traffic generation script:

```bash
python3 $SUMO_HOME/tools/randomTrips.py \
        -n map.net.xml \
        -o trips.rou.xml \
        -e 500 \
        --period 2 \
        --fringe-factor 5 \
        --seed 42 \
        --validate
```

---

## Step 5: The Configuration File

A `.sumocfg` file is the main configuration file for SUMO. Whenever you start a SUMO simulation, it needs to know:

- Which map to load
- Which vehicles/trips to load
- Which additional objects (vehicle types, detectors, bus stops, etc.)
- What time period to simulate

Instead of typing all these as long command-line arguments every time, SUMO reads everything from one single `.sumocfg` file. In simple words, `.sumocfg` is the master file that organizes the entire SUMO simulation.

### 1\. Define Vehicle Types (`vtypes.add.xml`)

First, create a small file to define the physics of your cars (acceleration, size, color).

```xml
<additional>
    <vType id="car" length="5.0" maxSpeed="40.0" accel="2.6" decel="4.5" tau="1.2"
           vClass="passenger" color="255,255,255"/>
</additional>
```

### 2\. Create the Master Config (`map.sumocfg`)

Create this file to tie everything together:

```xml
<configuration>
    <input>
        <net-file value="map.net.xml"/>
        <route-files value="routes.rou.xml"/>
        <additional-files value="vtypes.add.xml"/>
    </input>
    <time>
        <begin value="0"/>
        <end value="1000"/>
    </time>
</configuration>
```

You can now verify your work by running the visual simulation:

```bash
sumo-gui -c map.sumocfg
```

**💡 Tip:** In the GUI, look for the "Real World" option in the visualization drop-down menu. It makes the map look realistic. You can also adjust the **delay slider** to slow down or speed up the visualization.

![SUMO GUI](/images/blog/sumo.png)

### ⚠️ Teleport Warnings

You may see warnings in the log such as:
`Warning: Teleporting vehicle 'veh123' (jammed for too long)`

A teleport means a vehicle was stuck and SUMO moved it forward artificially. Fewer teleports generally indicate a cleaner and more realistic simulation. Too many vehicles or disconnected edges can increase teleporting.

---

## Step 6: Exporting Traces to ns-3

Now for the most important part: getting this data into ns-3. We need to convert the SUMO movement into a format ns-3 understands, typically the **ns-2 mobility trace format**.

This is a two-step process.

### 1\. Generate FCD (Floating Car Data) Output

Run SUMO in command-line mode to output raw position data.

```bash
sumo -c map.sumocfg --fcd-output sumoTrace.xml
```

### 2\. Convert to ns-2 format

Use the trace exporter tool to convert the XML into a TCL script.

```bash
python3 $SUMO_HOME/tools/traceExporter.py --fcd-input sumoTrace.xml --ns2mobility-output ns2mobility.tcl
```

You now have `ns2mobility.tcl`. If you open it, you will see lines like `$node_(0) setdest ...`. These are instructions telling ns-3 exactly where node "X" should be at any given second.

---

## Step 7: Integrating with ns-3

Finally, we need to tell your ns-3 simulation to use this trace file. You will use the `Ns2MobilityHelper` class.

Here is a clean example of how to set this up in your main script:

```cpp
#include "ns3/core-module.h"
#include "ns3/mobility-module.h"
#include "ns3/ns2-mobility-helper.h"
#include "ns3/node-container.h"

using namespace ns3;

int main (int argc, char *argv[])
{
    // This must match the number of vehicles generated in your trace
    uint32_t node_count = 150;
    double sim_time = 1200.0;

    NodeContainer nodes;
    nodes.Create (node_count);

    // Path is relative to the ns-3 root directory
    Ns2MobilityHelper ns2("path/to/your/ns2mobility.tcl");
    ns2.Install(nodes);

    // ... Install network stack, devices, and applications here ...

    Simulator::Stop(Seconds(sim_time));
    Simulator::Run();
    Simulator::Destroy();
    return 0;
}
```

### ⚠️ Warning: Application Start and End Times

There is one critical detail that we should be aware of. In SUMO, vehicles enter the simulation at different times. In ns-3, the nodes technically exist from time $t=0$, but they might sit at a default coordinate (like 0,0,0) until the trace file tells them to move.

**If you start your network application (like a broadcast) on all nodes at $t=0$, you will experience massive packet loss.**

**🔧 The Fix:** Start and end the the custom vehicle application at the time it actually enters in the sumo simulation. Check my GitHub [repo](https://github.com/tawsif76/vanet-beacon/tree/master) to learn more about it in detail.

## 📦 Complete Project Files and Source Code

All the associated files, scripts, configuration files, and ns-3 code used in this guide are available in my GitHub repository:
👉 **[GitHub Repository Link](https://github.com/tawsif76/vanet-beacon/tree/master/sumo)**
