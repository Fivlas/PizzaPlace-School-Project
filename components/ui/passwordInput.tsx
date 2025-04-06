import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { Input, InputProps } from "./input";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props}, ref) => {
        const [showPassword, setShopPassword] = useState(false);

        return (
            <div className="relative">
                <Input
                    type={showPassword ? "text" : "password" }
                    className={cn("pe-10", className)}
                    ref={ref}
                    {...props}
                />
                <button 
                    type="button"
                    onClick={() => setShopPassword(!showPassword)}
                    title={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground"
                >
                    {showPassword ? (
                        <EyeOff className="size-5"/>
                    ) : (
                        <Eye className="size-5"/>
                    )}
                </button>
            </div>
        )
    }
)

PasswordInput.displayName = "PasswordInput";
export { PasswordInput }