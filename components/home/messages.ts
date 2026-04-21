export type Locale = "en" | "ptBR";

export type HomeCopy = {
  brand: string;
  nav: { features: string; sources: string; how: string };
  cta: string;
  heroBadge: string;
  heroTitle: string;
  heroDesc: string;
  secondaryCta: string;
  heroOffer: string;
  processing: string;
  problemTitle: string;
  problemDesc: string;
  sourcesTitle: string;
  sourcesDesc: string;
  destinationsTitle: string;
  destinationsDesc: string;
  stepsTitle: string;
  builtForTitle: string;
  waitlistTitle: string;
  waitlistDesc: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  waitlistMessagePlaceholder: string;
  waitlistBtn: string;
  exitTitle: string;
  exitDesc: string;
  exitNamePlaceholder: string;
  exitEmailPlaceholder: string;
  exitBtn: string;
  exitDismiss: string;
  footer: string;
};

export const messages: Record<Locale, HomeCopy> = {
  en: {
    brand: "PipeLayer.dev",
    nav: { features: "Features", sources: "Sources", how: "How it works" },
    cta: "Get Stripe Early Access",
    heroBadge: "Stripe-first private beta",
    heroTitle: "Sync Stripe data to Google Sheets in minutes.",
    heroDesc:
      "Go live with Stripe exports to Google Sheets in a true serverless, no-code, plug-and-play flow. No engineering sprint, no scripts, no maintenance. Shopify is our next prioritized integration via waitlist.",
    secondaryCta: "See Stripe flow",
    heroOffer:
      "Special launch condition: first 50 signups get priority onboarding + Shopify priority access.",
    processing: "Processing",
    problemTitle: "Stop building fragile payment export scripts",
    problemDesc:
      "Replace manual Stripe exports and brittle cron jobs with a serverless no-code sync experience that your team can launch in minutes.",
    sourcesTitle: "Connect your source",
    sourcesDesc: "Stripe is live now. Shopify is the next prioritized integration.",
    destinationsTitle: "Export destinations",
    destinationsDesc:
      "Google Sheets is available now. PostgreSQL, Supabase, and Amazon S3 are coming soon.",
    stepsTitle: "Simple 3-step Stripe setup",
    builtForTitle: "Built for finance and growth teams",
    waitlistTitle: "Join Stripe early access",
    waitlistDesc:
      "Use this form to request Stripe integration access, join the Shopify waitlist, or send your questions to our team.",
    namePlaceholder: "Your name",
    emailPlaceholder: "Work Email",
    waitlistMessagePlaceholder:
      "Tell us if you want Stripe access, Shopify waitlist, or ask a question (optional)",
    waitlistBtn: "Send",
    exitTitle: "Wait, before you go...",
    exitDesc:
      "Request Stripe integration access, join the Shopify waitlist, or ask us a question in seconds.",
    exitNamePlaceholder: "Your name",
    exitEmailPlaceholder: "Your work email",
    exitBtn: "Get priority access",
    exitDismiss: "Maybe later",
    footer: "© 2026 Pipeline.dev. Stripe-first data sync for teams.",
  },
  ptBR: {
    brand: "PipeLayer.dev",
    nav: { features: "Recursos", sources: "Fontes", how: "Como funciona" },
    cta: "Entrar no Early Access Stripe",
    heroBadge: "Beta privado focado em Stripe",
    heroTitle: "Sincronize dados da Stripe para o Google Sheets em minutos.",
    heroDesc:
      "Entre em producao com exportacoes da Stripe para Google Sheets em um fluxo serverless, no-code e plug-and-play. Sem sprint de engenharia, sem scripts e sem manutencao. Shopify e nossa proxima integracao prioritaria via lista de espera.",
    secondaryCta: "Ver fluxo Stripe",
    heroOffer:
      "Condicao especial de lancamento: os primeiros 50 ganham onboarding prioritario + prioridade no acesso Shopify.",
    processing: "Processando",
    problemTitle: "Pare de manter scripts frageis de exportacao de pagamentos",
    problemDesc:
      "Troque exportacoes manuais da Stripe e cron jobs instaveis por uma experiencia serverless no-code que seu time ativa em minutos.",
    sourcesTitle: "Conecte sua fonte",
    sourcesDesc:
      "Stripe disponivel agora. Shopify e a proxima integracao prioritaria.",
    destinationsTitle: "Destinos de exportacao",
    destinationsDesc:
      "Google Sheets disponivel agora. PostgreSQL, Supabase e Amazon S3 em breve.",
    stepsTitle: "Configuracao Stripe em 3 passos",
    builtForTitle: "Feito para times financeiros e de crescimento",
    waitlistTitle: "Entre no early access da Stripe",
    waitlistDesc:
      "Use este formulario para solicitar acesso da integracao Stripe, entrar na lista de espera da Shopify ou enviar sua duvida para o nosso time.",
    namePlaceholder: "Seu nome",
    emailPlaceholder: "E-mail de trabalho",
    waitlistMessagePlaceholder:
      "Diga se voce quer acesso Stripe, lista Shopify ou tirar uma duvida (opcional)",
    waitlistBtn: "Enviar",
    exitTitle: "Espere, antes de sair...",
    exitDesc:
      "Solicite acesso da integracao Stripe, entre na lista da Shopify ou envie sua duvida em segundos.",
    exitNamePlaceholder: "Seu nome",
    exitEmailPlaceholder: "Seu e-mail de trabalho",
    exitBtn: "Quero acesso prioritario",
    exitDismiss: "Talvez depois",
    footer: "© 2026 Pipeline.dev. Sincronizacao Stripe-first para times.",
  },
};

export const painPoints = [
  {
    icon: "code_off",
    enTitle: "No more manual Stripe exports",
    ptTitle: "Sem exportacao manual da Stripe",
    enDesc:
      "Automate payments, refunds, and payout exports without maintaining one-off scripts.",
    ptDesc:
      "Automatize exportacoes de pagamentos, reembolsos e repasses sem manter scripts avulsos.",
  },
  {
    icon: "running_with_errors",
    enTitle: "Business-ready sync reliability",
    ptTitle: "Sincronizacao confiavel para o negocio",
    enDesc:
      "Run recurring Stripe exports with retries and visibility your ops team can trust.",
    ptDesc:
      "Rode exportacoes recorrentes da Stripe com retentativas e visibilidade para operacoes.",
  },
  {
    icon: "dns",
    enTitle: "Sheets first, stack-ready next",
    ptTitle: "Sheets agora, stack completa em seguida",
    enDesc:
      "Start in Google Sheets now and expand to PostgreSQL, Supabase, and S3 as they launch.",
    ptDesc:
      "Comece no Google Sheets agora e evolua para PostgreSQL, Supabase e S3 quando forem lancados.",
  },
] as const;

export const getSourceCards = (locale: Locale) =>
  locale === "en"
    ? [
        {
          icon: "payments",
          title: "Stripe",
          subtitle: "Payments data",
          status: "Available now",
          statusClass: "text-emerald-400",
        },
        {
          icon: "storefront",
          title: "Shopify",
          subtitle: "E-commerce data",
          status: "Next priority waitlist",
          statusClass: "text-amber-400",
        },
      ]
    : [
        {
          icon: "payments",
          title: "Stripe",
          subtitle: "Dados de pagamentos",
          status: "Disponivel agora",
          statusClass: "text-emerald-400",
        },
        {
          icon: "storefront",
          title: "Shopify",
          subtitle: "Dados de e-commerce",
          status: "Proxima prioridade na lista",
          statusClass: "text-amber-400",
        },
      ];

export const getDestinations = (locale: Locale) =>
  locale === "en"
    ? [
        {
          icon: "grid_on",
          title: "Google Sheets",
          status: "Available now",
          color: "text-green-400",
          statusClass: "text-emerald-300",
        },
        {
          icon: "storage",
          title: "PostgreSQL",
          status: "Coming soon",
          color: "text-blue-400",
          statusClass: "text-slate-400",
        },
        {
          icon: "database",
          title: "Supabase",
          status: "Coming soon",
          color: "text-cyan-400",
          statusClass: "text-slate-400",
        },
        {
          icon: "cloud_queue",
          title: "Amazon S3",
          status: "Coming soon",
          color: "text-orange-400",
          statusClass: "text-slate-400",
        },
      ]
    : [
        {
          icon: "grid_on",
          title: "Google Sheets",
          status: "Disponivel agora",
          color: "text-green-400",
          statusClass: "text-emerald-300",
        },
        {
          icon: "storage",
          title: "PostgreSQL",
          status: "Em breve",
          color: "text-blue-400",
          statusClass: "text-slate-400",
        },
        {
          icon: "database",
          title: "Supabase",
          status: "Em breve",
          color: "text-cyan-400",
          statusClass: "text-slate-400",
        },
        {
          icon: "cloud_queue",
          title: "Amazon S3",
          status: "Em breve",
          color: "text-orange-400",
          statusClass: "text-slate-400",
        },
      ];

export const getSteps = (locale: Locale) =>
  locale === "en"
    ? [
        {
          title: "Connect Stripe",
          desc: "Authenticate your Stripe account and choose the payment objects you want to export.",
          icon: "link",
        },
        {
          title: "Choose fields and schedule",
          desc: "Select the columns, filters, and sync cadence for finance and growth reporting.",
          icon: "settings_input_component",
        },
        {
          title: "Export to Google Sheets",
          desc: "Launch your Stripe-to-Sheets pipeline. PostgreSQL, Supabase, and S3 are next.",
          icon: "sync",
        },
      ]
    : [
        {
          title: "Conecte a Stripe",
          desc: "Autentique sua conta Stripe e escolha os objetos de pagamento que deseja exportar.",
          icon: "link",
        },
        {
          title: "Escolha campos e frequencia",
          desc: "Defina colunas, filtros e cadencia de sincronizacao para relatorios financeiros e de growth.",
          icon: "settings_input_component",
        },
        {
          title: "Exporte para Google Sheets",
          desc: "Ative o pipeline Stripe para Sheets. PostgreSQL, Supabase e S3 sao os proximos destinos.",
          icon: "sync",
        },
      ];

export const getFeatureBlocks = (locale: Locale) =>
  locale === "en"
    ? [
        [
          "payments",
          "Stripe-first, no-code setup",
          "Connect Stripe and launch in minutes with a plug-and-play, serverless experience.",
        ],
        [
          "schedule",
          "Scheduled exports",
          "Automate reporting syncs for daily, weekly, or custom windows.",
        ],
        [
          "verified_user",
          "Reliable delivery",
          "Retries and checks keep your Sheets exports consistent.",
        ],
        [
          "storefront",
          "Shopify next priority",
          "Shopify is the next integration in priority waitlist order.",
        ],
        [
          "database",
          "No maintenance overhead",
          "Serverless architecture means no infra to provision, patch, or monitor.",
        ],
        [
          "history",
          "Audit visibility",
          "Track each export run with clear operational history.",
        ],
      ]
    : [
        [
          "payments",
          "Modelo Stripe-first, no-code",
          "Conecte a Stripe e publique em minutos com uma experiencia plug-and-play e serverless.",
        ],
        [
          "schedule",
          "Exportacoes agendadas",
          "Automatize sincronizacoes para relatorios diarios, semanais ou personalizados.",
        ],
        [
          "verified_user",
          "Entrega confiavel",
          "Retentativas e validacoes mantem exportacoes para Sheets consistentes.",
        ],
        [
          "storefront",
          "Shopify como proxima prioridade",
          "Shopify e a proxima integracao seguindo ordem de prioridade na lista.",
        ],
        [
          "database",
          "Sem sobrecarga de manutencao",
          "Arquitetura serverless sem infraestrutura para provisionar, atualizar ou monitorar.",
        ],
        [
          "history",
          "Visibilidade operacional",
          "Acompanhe cada execucao com historico claro para operacoes.",
        ],
      ];

export const getUseCases = (locale: Locale) =>
  locale === "en"
    ? [
        { icon: "receipt_long", label: "Finance reporting" },
        { icon: "payments", label: "Revenue and refund tracking" },
        { icon: "bar_chart", label: "Growth performance dashboards" },
        { icon: "schedule", label: "Recurring ops exports" },
        { icon: "file_download", label: "Stripe to Sheets workflows" },
      ]
    : [
        { icon: "receipt_long", label: "Relatorios financeiros" },
        { icon: "payments", label: "Acompanhamento de receita e reembolso" },
        { icon: "bar_chart", label: "Dashboards de performance de growth" },
        { icon: "schedule", label: "Exportacoes operacionais recorrentes" },
        { icon: "file_download", label: "Fluxos Stripe para Sheets" },
      ];
