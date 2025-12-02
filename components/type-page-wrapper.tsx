"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { TypePageShell } from "./type-page-shell";
import { AddPropertyButton } from "./admin/add-property-button";
import type { Property, PropertyType } from "@/lib/types";

interface TypePageWrapperProps {
  properties: Property[];
  type: PropertyType;
  summary?: string;
}

export function TypePageWrapper({ properties, type, summary }: TypePageWrapperProps) {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className="space-y-8">
      {/* Admin: Add Button */}
      {!isLoading && isAuthenticated && (
        <div className="flex justify-end">
          <AddPropertyButton type={type} />
        </div>
      )}

      {/* Content */}
      <TypePageShell properties={properties} type={type} summary={summary} />
    </div>
  );
}


