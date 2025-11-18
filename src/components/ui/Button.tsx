import { ButtonHTMLAttributes, forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/libs/utils"

// Omit conflicting event handlers between HTML and framer-motion
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 
    'onDrag' | 'onDragStart' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver' | 'onDrop' |
    'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
> {
    variant?: "primary" | "secondary" | "ghost" | "outline"
    size?: "sm" | "md" | "lg"
    children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        const baseStyles =
            "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"

        const variants = {
            primary: "bg-white text-black hover:bg-white/90 shadow-lg hover:shadow-xl",
            secondary: "bg-white/5 text-white hover:bg-white/10 border border-white/10",
            ghost: "text-white/70 hover:text-white hover:bg-white/5",
            outline: "border border-white/10 text-white hover:bg-white/5"
        }

        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3",
            lg: "px-8 py-4"
        }

        return (
            <motion.button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                {...props}>
                {children}
            </motion.button>
        )
    }
)

Button.displayName = "Button"

export default Button
