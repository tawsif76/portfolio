---
title: "Understanding the Math Behind PBFT's Consensus Threshold"
date: "2024-01-15"
excerpt: "An overview of contemporary network security threats and the evolving landscape of cybersecurity in distributed systems."
tags: ["Network Security", "Cybersecurity", "Distributed Systems"]
image: "/images/blog/consensus.png" # Add this line
---

---

PBFT (Practical Byzantine Fault Tolerance) is a widely used consensus algorithm in systems where performance and fault tolerance are both important. It is commonly used in permissioned blockchains to ensure that multiple nodes can agree on the same data, even if some of the nodes are faulty or malicious. But we often ruminate over one question:

> Why does PBFT require a minimum of $3f + 1$ total nodes, and why does it need $2f + 1$ votes to commit a decision?

## The Two Core Problems to Solve

To be considered reliable, any consensus algorithm must solve two essential problems:

**Safety:** The system must never finalize two conflicting decisions. For example, it should not be possible for both Block A and Block B to be committed at the same height. Once a decision is made, it is final.

**Liveness:** The system must continue making progress. Even if some nodes are faulty or unresponsive, the honest nodes should still be able to reach consensus and not get stuck.

The rules $n \geq 3f + 1$ (total nodes) and $q = 2f + 1$ (quorum size) are the minimum requirements needed to satisfy both properties.

## Step-by-Step Derivation

Let's define our terms first:

- $f$: The maximum number of nodes that can be faulty
- $n$: The total number of nodes in the system
- $q$: The number of votes needed to commit a value (the quorum size)

We will derive the values of $q$ and $n$ from our two goals above, showing how they are logically connected.

### 1. Quorum Size (q) from the Safety Condition

To ensure safety, we must prevent two conflicting decisions from being committed at the same time. For that, any two quorums must share at least one honest node.

This overlap guarantees that an honest node will witness both decisions. Since honest nodes follow the protocol and never vote for two different values at the same height, the existence of an honest node in the overlap ensures safety.

Let's say two quorums of size $q$ form: Quorum A and Quorum B. The minimum number of shared nodes between them is:

<div style="text-align: center; margin: 1.5rem 0;">

$$\boxed{\text{Overlap} \geq (q + q) - n = 2q - n}$$

</div>

To be safe, this overlap must contain more nodes than the total number of faulty nodes, $f$. This gives us the **Safety Condition**:

<div style="text-align: center; margin: 1.5rem 0;">

$\boxed{2q - n > f}$

</div>

> **The Marble Analogy: Why the Overlap Must Be f + 1**
>
> To understand why the overlap must be greater than $f$, consider this analogy:
>
> Imagine a bag with red marbles (faulty nodes) and blue marbles (honest nodes). You are told there are at most 5 red marbles ($f = 5$). How many marbles must you draw to be absolutely certain you have at least one blue marble?
>
> In the worst-case scenario, you might first draw all 5 red marbles. Only on the 6th draw ($f + 1$) can you be sure the marble is blue.
>
> This is why a quorum overlap must be at least $f + 1$—to guarantee at least one honest node is included.

---

### 2. Total Nodes (n) from the Liveness Condition

To ensure liveness, the system must make progress even if all $f$ faulty nodes stop responding. In this worst case, the remaining honest nodes must still be able to form a quorum by themselves.

- The number of honest nodes is $n - f$
- The required quorum size is $q$

This gives us the **Liveness Condition**:

<div style="text-align: center; margin: 1.5rem 0;">

$$\boxed{n - f \geq q}$$

</div>

### 3. Solving the System

We now have two conditions that must both be true:

1.  **Safety:** $2q - n > f$
2.  **Liveness:** $n - f \geq q$

From the liveness condition, we can rearrange: $n \geq q + f$.

Substitute this into the safety condition:

<div style="text-align: center; margin: 1.5rem 0;">

$$2q - (q + f) > f$$

</div>

<div style="text-align: center; margin: 1.5rem 0;">

$$q - f > f$$

</div>

<div style="text-align: center; margin: 1.5rem 0;">

$$\boxed{q > 2f}$$

</div>

The smallest integer $q$ that satisfies this is:

<div style="text-align: center; margin: 1.5rem 0;">

$$\boxed{q = 2f + 1}$$

</div>

Now plug this back into the liveness condition:

<div style="text-align: center; margin: 1.5rem 0;">

$$n - f \geq (2f + 1)$$

</div>

<div style="text-align: center; margin: 1.5rem 0;">

$$\boxed{n \geq 3f + 1}$$

</div>

So, we have logically derived both:

- The number of votes required to commit a value is **$2f + 1$**
- The total number of nodes must be at least **$3f + 1$**

---

## An Example Walkthrough

Let's say the system is designed to tolerate $f = 4$ faulty nodes.

**Total Nodes Needed:**

<div style="text-align: center; margin: 1.5rem 0;">

$$n = 3 \times 4 + 1 = 13$$

</div>

**Quorum Size:**

<div style="text-align: center; margin: 1.5rem 0;">

$$q = 2 \times 4 + 1 = 9$$

</div>

Now, suppose an attacker tries to get two different blocks committed: Block A and Block B.

- Quorum A (9 nodes) votes for Block A
- Quorum B (9 nodes) votes for Block B

Since there are only 13 nodes in total, the minimum overlap is:

<div style="text-align: center; margin: 1.5rem 0;">

$$\boxed{\text{Overlap} = (2 \times 9) - 13 = 5}$$

</div>

The two quorums must share 5 nodes. Since only 4 nodes in the entire system can be faulty, at least one of the 5 overlapping nodes must be honest. That honest node will not vote for both blocks. Therefore, only one of the blocks can be committed.
