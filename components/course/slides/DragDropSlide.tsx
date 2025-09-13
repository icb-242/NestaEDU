"use client";

import { useState, useEffect } from "react";
import { DragDropSlide } from "@/lib/course/types";

export function DragDropSlideComponent({ slide, onComplete }: { slide: DragDropSlide; onComplete?: () => void }) {
  const [dropped, setDropped] = useState<Record<string, string>>({});

  const handleDrop = (itemId: string, targetId: string) => {
    setDropped((prev) => ({ ...prev, [itemId]: targetId }));
    const allPlaced = slide.items.every((it) => {
      const currentTarget = itemId === it.id ? targetId : dropped[it.id];
      return currentTarget === it.correctTarget;
    });
    if (allPlaced) onComplete?.();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">{slide.heading}</h3>
      {slide.content && <p className="text-muted-foreground">{slide.content}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold">Items to Sort</h4>
          <div className="space-y-2">
            {slide.items.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-secondary/20 rounded-lg cursor-move"
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", item.id)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-semibold">Drop Zones</h4>
          <div className="space-y-2">
            {slide.targets.map((t) => (
              <div
                key={t.id}
                className="p-4 border-2 border-dashed border-primary/20 rounded-lg min-h-[100px]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const itemId = e.dataTransfer.getData("text/plain");
                  handleDrop(itemId, t.id);
                }}
              >
                <div className="font-medium mb-2">{t.label}</div>
                {Object.entries(dropped)
                  .filter(([, targetId]) => targetId === t.id)
                  .map(([itemId]) => {
                    const item = slide.items.find((i) => i.id === itemId);
                    return item ? (
                      <div key={itemId} className="p-2 bg-secondary rounded-md my-1">
                        {item.label}
                      </div>
                    ) : null;
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



