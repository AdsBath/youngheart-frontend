"use client";

import { Badge } from "@/components/ui/badge";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { X } from "lucide-react";
import * as React from "react";
import { useCallback, useRef, useState } from "react";

type Framework = Record<"id" | "title", string>;

interface FancyMultiSelectProps {
    selected: Framework[];
    onSelectedChange: (selected: Framework[]) => void;
    data: Framework[];
    placeholder: string;
}

export function FancyMultiSelect({
    selected,
    onSelectedChange,
    data,
    placeholder,
}: FancyMultiSelectProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleUnselect = useCallback(
        (framework: Framework) => {
            onSelectedChange(selected.filter((s) => s.id !== framework.id));
        },
        [selected, onSelectedChange]
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;
            if (input) {
                if (e.key === "Delete" || e.key === "Backspace") {
                    if (input.value === "") {
                        onSelectedChange(selected.slice(0, -1));
                    }
                }
                if (e.key === "Escape") {
                    input.blur();
                }
            }
        },
        [selected, onSelectedChange]
    );

    const selectables = data?.filter(
        (framework) => !selected?.some((s) => s.id === framework.id)
    );

    return (
        <Command
            onKeyDown={handleKeyDown}
            className="overflow-visible bg-transparent w-full relative "
        >
            <CommandList>
                <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <div className="flex gap-1 flex-wrap">
                        {selected?.map((framework) => (
                            <Badge key={framework.id} variant="secondary">
                                {framework.title}
                                <button
                                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleUnselect(framework);
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(framework)}
                                >
                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </button>
                            </Badge>
                        ))}
                        <CommandPrimitive.Input
                            ref={inputRef}
                            value={inputValue}
                            onValueChange={setInputValue}
                            onBlur={() => setOpen(false)}
                            onFocus={() => setOpen(true)}
                            placeholder={placeholder}
                            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                        />
                    </div>
                </div>
                <div className="absolute w-full mt-2">
                    {open && selectables?.length > 0 ? (
                        <div className="absolute w-full top-0 z-10 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                            <CommandGroup className="h-full z-50 overflow-hidden w-full">
                                {selectables?.map((framework) => (
                                    <CommandItem
                                        key={framework?.id}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onSelect={() => {
                                            setInputValue("");
                                            onSelectedChange([
                                                ...selected,
                                                framework,
                                            ]);
                                        }}
                                        className="cursor-pointer"
                                    >
                                        {framework?.title}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </div>
                    ) : null}
                </div>
            </CommandList>
        </Command>
    );
}
