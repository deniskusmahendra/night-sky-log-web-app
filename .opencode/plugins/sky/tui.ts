import { Plugin } from "@opencode/plugin/tui"

export default Plugin.define({
  id: "night-sky-log.sky",
  setup(context) {
    context.keymap.layer(() => ({
      mode: "global",
      commands: [
        {
          id: "night-sky-log.sky",
          title: "/sky — Clear skies tonight",
          group: "Night Sky Log",
          palette: true,
          suggested: true,
          enabled: () => true,
          slash: { name: "sky" },
          run: () => {
            context.ui.toast.show({ message: "Clear skies tonight" })
          },
        },
      ],
      bindings: ["night-sky-log.sky"],
    }))
  },
})
