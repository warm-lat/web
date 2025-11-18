import { HTMLAttributes, forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/libs/utils"

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 
    'onDrag' | 'onDragStart' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver' | 'onDrop' |
    'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
> {
    hover?: boolean
    gradient?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, hover = true, gradient = false, children, ...props }, ref) => {
        const baseStyles =
            "relative bg-white/[0.02] border border-white/10 rounded-2xl p-8 transition-all duration-300 overflow-hidden"

        const hoverStyles = hover
            ? "hover:border-white/15 hover:bg-white/[0.03]"
            : ""

        return (
            <motion.div
                ref={ref}
                className={cn(baseStyles, hoverStyles, className)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                {...props}>
                <div className="relative z-10">{children}</div>
                {gradient && (
                    <div
                        className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent 
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                )}
            </motion.div>
        )
    }
)

Card.displayName = "Card"

export default Card
