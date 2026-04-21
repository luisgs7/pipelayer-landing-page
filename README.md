# Pipeline.dev — site (Nuxt)

Site de marketing em [Nuxt 3](https://nuxt.com/) (Vue 3, Vite) com [Tailwind CSS v4](https://tailwindcss.com/).

## Requisitos

- [Node.js](https://nodejs.org/) **>= 22.12.0**

## Estrutura do projeto

```text
/
├── assets/
│   └── css/
│       └── main.css          # Tailwind + tema (@theme)
├── components/
│   ├── Home.vue              # Página principal (landing)
│   └── home/                 # Secções e cópias partilhadas
├── layouts/
│   └── default.vue           # Shell HTML, meta e fontes (useHead)
├── pages/
│   └── index.vue             # Rota /
├── public/
│   └── favicon.svg
├── app.vue
├── nuxt.config.ts
└── package.json
```

Ficheiros em `components/` são [auto-importados](https://nuxt.com/docs/guide/concepts/auto-imports). Estilos globais entram via `nuxt.config.ts` (`css: ['~/assets/css/main.css']`).

## Comandos

Na raiz do repositório:

| Comando           | Descrição |
| ----------------- | --------- |
| `npm install`     | Instala dependências e corre `nuxt prepare` (tipos) |
| `npm run dev`     | Servidor de desenvolvimento (por defeito [http://localhost:3000](http://localhost:3000)) |
| `npm run build`   | Build de produção (saída em `.output/`) |
| `npm run preview` | Pré-visualização local do build |
| `npm run generate`| Geração estática (pré-render), útil para hosting só de ficheiros |

## Documentação

- [Nuxt](https://nuxt.com/docs)
- [Vue 3](https://vuejs.org/guide/introduction.html)
