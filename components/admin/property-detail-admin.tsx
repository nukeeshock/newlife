"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { PropertyAdminActions } from "./property-admin-actions";
import { EditPropertyButton } from "./edit-property-button";
import type { Property } from "@/lib/types";

interface PropertyDetailAdminProps {
  property: Property;
}

export function PropertyDetailAdmin({ property }: PropertyDetailAdminProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading || !isAuthenticated) return null;

  return (
    <div className="fixed right-6 top-24 z-40 border border-[--glass-border] bg-[--card]/95 p-4 backdrop-blur-xl md:right-8">
      <div className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-[--muted]">
        Admin
      </div>
      <div className="space-y-3">
        <EditPropertyButton property={property} />
        <div className="h-px bg-[--glass-border]" />
        <PropertyAdminActions property={property} />
      </div>
    </div>
  );
}

