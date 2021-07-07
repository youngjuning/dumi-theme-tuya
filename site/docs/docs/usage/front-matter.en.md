---
group:
  title: Basic Usage
  order: 3

title: Markdown meta
---

## Meta

The top two Front Matter contents in the Markdown file are meta information and are written in YAML syntax format. Dumi specifies some configuration:

```txt
---
title: Custom page name
nav:
  path: /Custom navigation route
  title: Custom navigation name
  order: Control the navigation order, the smaller the number, the higher the order, the default is to sort by path length and dictionary order
group:
  path: /Custom group routing, note that group routing = navigation routing + yourself
  title: Custom group name
  order: Control the grouping order, the smaller the number, the higher the order, the default is to sort by path length and dictionary order
---

<!-- Other Markdown content -->
```

See more configuration items https://d.umijs.org/zh-CN/config/frontmatter

## Meta Extend

This theme extends the meta of the dumi convention:

1. demo

```txt
---
title: Battery
desc: '`Battery` is a battery component, which is generally used in scenarios where the battery percentage needs to be displayed.'
demo: /basic/battery
---
```

The value of the demo configuration is used to tell the demo the route to load the URL, which is sent to the demo via a POST Message.
