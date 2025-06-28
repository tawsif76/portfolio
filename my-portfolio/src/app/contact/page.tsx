"use client";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div className="max-w-md w-full">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-foreground">
          Contact Information
        </h1>
        <div className="space-y-6">
          {/* Email */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4 shrink-0">
              <Mail className="text-white" size={20} />
            </div>
            <div>
              <p className="text-foreground/80 font-medium">Email</p>
              <a
                href="mailto:sydul.tawsif@gamil.com"
                className="text-blue-600 dark:text-blue-400 hover:underline break-all"
              >
                sydul.tawsif@gmail.com
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4 shrink-0">
              <Phone className="text-white" size={20} />
            </div>
            <div>
              <p className="text-foreground/80 font-medium">Phone</p>
              <a
                href="tel:+8801305997566"
                className="text-green-600 dark:text-green-400 hover:underline"
              >
                +8801305997566
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4 shrink-0">
              <MapPin className="text-white" size={20} />
            </div>
            <div>
              <p className="text-foreground/80 font-medium">Location</p>
              <p className="text-purple-600 dark:text-purple-400">
                Chattogram, Bangladesh
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
