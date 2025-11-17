import { HTMLAttributes, forwardRef } from "react"
import { cn } from "@/libs/utils"

export interface SectionProps extends HTMLAttributes<HTMLElement> {
    spacing?: "sm" | "md" | "lg"
}

const Section = forwardRef<HTMLElement, SectionProps>(
    ({ className, spacing = "lg", children, ...props }, ref) => {
        const spacings = {
            sm: "py-12",
            md: "py-24",
            lg: "py-32"
        }

        return (
            <section
                ref={ref}
                className={cn("relative", spacings[spacing], className)}
                {...props}>
                {children}
            </section>
        )
    }
)

Section.displayName = "Section"

export default Section
