import { ChannelIcon } from "./ChannelIcon";

type Channel = "IG" | "WhatsApp" | "Facebook" | "Website";

export function ChannelPill({ channel }: { channel: Channel }) {
  const map = {
    IG: { key: "ig", title: "Instagram", cls: "ch-ig" },
    WhatsApp: { key: "wa", title: "WhatsApp", cls: "ch-wa" },
    Facebook: { key: "fb", title: "Facebook", cls: "ch-fb" },
    Website: { key: "web", title: "Website", cls: "ch-web" },
  } as const;

  const cfg = map[channel] ?? map.Website;

  return (
    <span
      className={`ch-icon-pill ${cfg.cls}`}
      title={cfg.title}
      aria-label={cfg.title}
    >
      <ChannelIcon channel={cfg.key} />
    </span>
  );
}
