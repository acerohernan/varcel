import * as React from "react";
import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { cn } from "@/lib/utils";

import { useUser } from "@/hooks/query/useUser";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export const TeamSwitcher = ({ className }: TeamSwitcherProps) => {
  const [open, setOpen] = React.useState(false);
  const { data: user } = useUser();

  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      <Link to="/" className="flex items-center gap-2">
        <Avatar className="h-5 w-5">
          <AvatarImage src={`https://avatar.vercel.sh/${user.username}.png`} alt={user.username} />
          <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-light">{user.username}</span>
      </Link>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("flex items-center justify-center w-[30px]", className)}
          >
            <CaretSortIcon className="shrink-0 opacity-50 h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command className="bg-background-secondary">
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              <CommandGroup heading="Personal Account">
                <CommandItem
                  key={user.username}
                  onSelect={() => {
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage src={`https://avatar.vercel.sh/${user.username}.png`} alt={user.username} />
                    <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {user.username}
                  <CheckIcon className={cn("ml-auto h-4 w-4", true ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  disabled
                  className="opacity-50"
                  onSelect={() => {
                    setOpen(false);
                  }}
                >
                  <PlusCircledIcon className="mr-2 h-5 w-5" />
                  Create Team
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
