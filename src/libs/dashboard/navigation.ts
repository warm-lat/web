import {
    DoorOpen,
    FileKey,
    FileScan,
    Hash,
    Music,
    ScrollText,
    Settings,
    Tag,
    Terminal,
    TicketCheck,
} from "lucide-react"

export const navigation = {
    General: [
        { name: "Overview", icon: Hash, href: "" },
        { name: "Base Configuration", icon: Settings, href: "/config" },
        { name: "Music", icon: Music, href: "/music", isComingSoon: false }
    ],
    "Server Configuration": [
        { name: "Welcome & Leave Messages", icon: DoorOpen, href: "/greet", isComingSoon: false },
        { name: "Antinuke", icon: Terminal, href: "/security" },
        { name: "Automation", icon: Tag, href: "/automation", isComingSoon: false },
        { name: "Logs", icon: ScrollText, href: "/logs" }
    ],
    Tickets: [
        { name: "Panels", icon: TicketCheck, href: "/tickets", isComingSoon: true },
        { name: "Custom Embeds", icon: FileScan, href: "/embeds", isComingSoon: true }
    ],
    "Server Moderation": [
        { name: "Moderator Logs", icon: FileScan, href: "/modlogs" },
        { name: "Mitigated Events", icon: FileKey, href: "/mitigated", isComingSoon: true }
    ]
}
