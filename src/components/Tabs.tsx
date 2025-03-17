"use client";

import * as React from "react";
import { Tabs as ShadcnTabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Tab = {
    id: string;
    label: string;
};

type TabsProps = {
    tabs: Tab[];
    defaultTabId?: string;
    children: (activeTabId: string) => React.ReactNode;
};

export function Tabs({ tabs, defaultTabId, children }: TabsProps) {
    const [activeTabId, setActiveTabId] = React.useState(defaultTabId || tabs[0].id);

    return (
        <ShadcnTabs
            defaultValue={activeTabId}
            onValueChange={setActiveTabId}
            className="w-full"
        >
            <TabsList className="grid grid-cols-2 w-full">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>

            <div className="mt-6">
                {tabs.map((tab) => (
                    <TabsContent key={tab.id} value={tab.id}>
                        {children(tab.id)}
                    </TabsContent>
                ))}
            </div>
        </ShadcnTabs>
    );
}
