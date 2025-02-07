"use client";
import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PasswordProps {
  id: number;
  website: string;
  username: string;
  password: string;
}

export function YourPasswords({
  passwords = [],
}: {
  passwords: PasswordProps[];
}) {
  const [visiblePasswords, setVisiblePasswords] = useState<number[]>([]);

  const togglePasswordVisibility = (id: number) => {
    setVisiblePasswords((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  
  return (
    <div className="space-y-4">
      {passwords.length === 0 && "No passwords found"}
      {passwords.map((password: PasswordProps, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <Link href={password.website} target="_blank" className="font-semibold text-blue-500 underline">{password.website}</Link>
                <p className="text-sm text-muted-foreground">
                  {password.username}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <p className="font-mono">
                  {visiblePasswords.includes(password.id)
                    ? password.password
                    : "••••••••"}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => togglePasswordVisibility(password.id)}
                >
                  {visiblePasswords.includes(password.id) ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
