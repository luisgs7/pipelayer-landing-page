<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

type Locale = "en" | "ptBR";
const currentLocale = ref<Locale>("en");
const setLocale = (locale: Locale) => (currentLocale.value = locale);
const pressedItem = ref<string | null>(null);
const focusSectionId = ref<string | null>(null);
const showExitPopup = ref(false);
const EXIT_POPUP_COOLDOWN_MS = 30000;

const animateClick = (id: string) => {
    pressedItem.value = id;
    window.setTimeout(() => {
        if (pressedItem.value === id) pressedItem.value = null;
    }, 220);
};

const scrollToSection = (id: string, clickId: string) => {
    animateClick(clickId);
    const target = document.getElementById(id);
    if (!target) return;

    const y = target.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: y, behavior: "smooth" });
    focusSectionId.value = id;
    window.setTimeout(() => {
        if (focusSectionId.value === id) focusSectionId.value = null;
    }, 900);
};

const scrollToTop = () => {
    animateClick("brand-top");
    window.scrollTo({ top: 0, behavior: "smooth" });
};

const closeExitPopup = () => {
    showExitPopup.value = false;
    sessionStorage.setItem("exit-popup-last-shown-at", String(Date.now()));
};

const handleExitSubmit = () => {
    closeExitPopup();
    scrollToSection("waitlist", "cta-top");
};

const onExitIntent = (event: MouseEvent) => {
    const lastShownAt = Number(sessionStorage.getItem("exit-popup-last-shown-at") || "0");
    const inCooldown = Date.now() - lastShownAt < EXIT_POPUP_COOLDOWN_MS;
    if (inCooldown || showExitPopup.value) return;

    if (event.clientY <= 8 && !event.relatedTarget) {
        showExitPopup.value = true;
        sessionStorage.setItem("exit-popup-last-shown-at", String(Date.now()));
    }
};

onMounted(() => {
    document.addEventListener("mouseout", onExitIntent);
});

onBeforeUnmount(() => {
    document.removeEventListener("mouseout", onExitIntent);
});

const messages = {
    en: {
        brand: "PipeLayer.dev",
        nav: { features: "Features", sources: "Sources", how: "How it works" },
        cta: "Get Stripe Early Access",
        heroBadge: "Stripe-first private beta",
        heroTitle:
            "Sync Stripe data to Google Sheets in minutes.",
        heroDesc:
            "Go live with Stripe exports to Google Sheets in a true serverless, no-code, plug-and-play flow. No engineering sprint, no scripts, no maintenance. Shopify is our next prioritized integration via waitlist.",
        secondaryCta: "See Stripe flow",
        heroOffer: "Special launch condition: first 50 signups get priority onboarding + Shopify priority access.",
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
        waitlistMessagePlaceholder: "Tell us if you want Stripe access, Shopify waitlist, or ask a question (optional)",
        waitlistBtn: "Send",
        exitTitle: "Wait, before you go...",
        exitDesc: "Request Stripe integration access, join the Shopify waitlist, or ask us a question in seconds.",
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
        heroTitle:
            "Sincronize dados da Stripe para o Google Sheets em minutos.",
        heroDesc:
            "Entre em producao com exportacoes da Stripe para Google Sheets em um fluxo serverless, no-code e plug-and-play. Sem sprint de engenharia, sem scripts e sem manutencao. Shopify e nossa proxima integracao prioritaria via lista de espera.",
        secondaryCta: "Ver fluxo Stripe",
        heroOffer: "Condicao especial de lancamento: os primeiros 50 ganham onboarding prioritario + prioridade no acesso Shopify.",
        processing: "Processando",
        problemTitle: "Pare de manter scripts frageis de exportacao de pagamentos",
        problemDesc:
            "Troque exportacoes manuais da Stripe e cron jobs instaveis por uma experiencia serverless no-code que seu time ativa em minutos.",
        sourcesTitle: "Conecte sua fonte",
        sourcesDesc: "Stripe disponivel agora. Shopify e a proxima integracao prioritaria.",
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
        waitlistMessagePlaceholder: "Diga se voce quer acesso Stripe, lista Shopify ou tirar uma duvida (opcional)",
        waitlistBtn: "Enviar",
        exitTitle: "Espere, antes de sair...",
        exitDesc: "Solicite acesso da integracao Stripe, entre na lista da Shopify ou envie sua duvida em segundos.",
        exitNamePlaceholder: "Seu nome",
        exitEmailPlaceholder: "Seu e-mail de trabalho",
        exitBtn: "Quero acesso prioritario",
        exitDismiss: "Talvez depois",
        footer: "© 2026 Pipeline.dev. Sincronizacao Stripe-first para times.",
    },
};
const t = computed(() => messages[currentLocale.value]);

const sourceCards = computed(() =>
    currentLocale.value === "en"
        ? [
            { icon: "payments", title: "Stripe", subtitle: "Payments data", status: "Available now", statusClass: "text-emerald-400" },
            { icon: "storefront", title: "Shopify", subtitle: "E-commerce data", status: "Next priority waitlist", statusClass: "text-amber-400" },
        ]
        : [
            { icon: "payments", title: "Stripe", subtitle: "Dados de pagamentos", status: "Disponivel agora", statusClass: "text-emerald-400" },
            { icon: "storefront", title: "Shopify", subtitle: "Dados de e-commerce", status: "Proxima prioridade na lista", statusClass: "text-amber-400" },
        ],
);

const destinations = computed(() =>
    currentLocale.value === "en"
        ? [
            { icon: "grid_on", title: "Google Sheets", status: "Available now", color: "text-green-400", statusClass: "text-emerald-300" },
            { icon: "storage", title: "PostgreSQL", status: "Coming soon", color: "text-blue-400", statusClass: "text-slate-400" },
            { icon: "database", title: "Supabase", status: "Coming soon", color: "text-cyan-400", statusClass: "text-slate-400" },
            { icon: "cloud_queue", title: "Amazon S3", status: "Coming soon", color: "text-orange-400", statusClass: "text-slate-400" },
        ]
        : [
            { icon: "grid_on", title: "Google Sheets", status: "Disponivel agora", color: "text-green-400", statusClass: "text-emerald-300" },
            { icon: "storage", title: "PostgreSQL", status: "Em breve", color: "text-blue-400", statusClass: "text-slate-400" },
            { icon: "database", title: "Supabase", status: "Em breve", color: "text-cyan-400", statusClass: "text-slate-400" },
            { icon: "cloud_queue", title: "Amazon S3", status: "Em breve", color: "text-orange-400", statusClass: "text-slate-400" },
        ],
);

const painPoints = [
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
];

const steps = computed(() =>
    currentLocale.value === "en"
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
        ],
);

const featureBlocks = computed(() =>
    currentLocale.value === "en"
        ? [
            ["payments", "Stripe-first, no-code setup", "Connect Stripe and launch in minutes with a plug-and-play, serverless experience."],
            ["schedule", "Scheduled exports", "Automate reporting syncs for daily, weekly, or custom windows."],
            ["verified_user", "Reliable delivery", "Retries and checks keep your Sheets exports consistent."],
            ["storefront", "Shopify next priority", "Shopify is the next integration in priority waitlist order."],
            ["database", "No maintenance overhead", "Serverless architecture means no infra to provision, patch, or monitor."],
            ["history", "Audit visibility", "Track each export run with clear operational history."],
        ]
        : [
            ["payments", "Modelo Stripe-first, no-code", "Conecte a Stripe e publique em minutos com uma experiencia plug-and-play e serverless."],
            ["schedule", "Exportacoes agendadas", "Automatize sincronizacoes para relatorios diarios, semanais ou personalizados."],
            ["verified_user", "Entrega confiavel", "Retentativas e validacoes mantem exportacoes para Sheets consistentes."],
            ["storefront", "Shopify como proxima prioridade", "Shopify e a proxima integracao seguindo ordem de prioridade na lista."],
            ["database", "Sem sobrecarga de manutencao", "Arquitetura serverless sem infraestrutura para provisionar, atualizar ou monitorar."],
            ["history", "Visibilidade operacional", "Acompanhe cada execucao com historico claro para operacoes."],
        ],
);

const useCases = computed(() =>
    currentLocale.value === "en"
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
        ],
);
</script>

<template>
    <div
        class="site-backdrop bg-background-light font-display text-slate-900 antialiased dark:bg-background-dark dark:text-slate-100">
        <div class="infra-bg" aria-hidden="true">
            <span class="infra-node infra-node--api"></span>
            <span class="infra-node infra-node--processor"></span>
            <span class="infra-node infra-node--cloud"></span>
            <span class="infra-link infra-link--a"></span>
            <span class="infra-link infra-link--b"></span>
            <span class="infra-pulse infra-pulse--a"></span>
            <span class="infra-pulse infra-pulse--b"></span>
        </div>
        <header
            class="sticky top-0 z-50 border-b border-slate-200 bg-background-light/80 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/80">
            <div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6">
                <button
                    type="button"
                    class="click-pop flex items-center gap-2"
                    :class="{ 'is-clicked': pressedItem === 'brand-top' }"
                    @click="scrollToTop"
                >
                    <div class="text-primary">
                        <span class="material-symbols-outlined text-3xl">account_tree</span>
                    </div>
                    <span class="text-lg font-bold tracking-tight sm:text-xl">{{ t.brand }}</span>
                </button>
                <nav class="hidden items-center gap-8 md:flex">
                    <button
                        type="button"
                        class="click-pop text-sm font-medium transition-colors hover:text-primary"
                        :class="{ 'is-clicked': pressedItem === 'nav-features' }"
                        @click="scrollToSection('features', 'nav-features')"
                    >{{
                        t.nav.features }}</button>
                    <button
                        type="button"
                        class="click-pop text-sm font-medium transition-colors hover:text-primary"
                        :class="{ 'is-clicked': pressedItem === 'nav-sources' }"
                        @click="scrollToSection('sources', 'nav-sources')"
                    >{{ t.nav.sources
                        }}</button>
                    <button
                        type="button"
                        class="click-pop text-sm font-medium transition-colors hover:text-primary"
                        :class="{ 'is-clicked': pressedItem === 'nav-how' }"
                        @click="scrollToSection('how-it-works', 'nav-how')"
                    >{{
                        t.nav.how }}</button>
                </nav>
                <div class="flex items-center gap-2 sm:gap-4">
                    <div class="hidden items-center text-sm font-medium sm:flex">
                        <button
                            class="click-pop hover:text-primary transition-colors"
                            :class="[currentLocale === 'en' ? 'text-primary' : '', pressedItem === 'lang-en' ? 'is-clicked' : '']"
                            @click="setLocale('en'); animateClick('lang-en')"
                        >EN</button>
                        <span class="mx-2 text-slate-400">|</span>
                        <button
                            class="click-pop hover:text-primary transition-colors"
                            :class="[currentLocale === 'ptBR' ? 'text-primary' : '', pressedItem === 'lang-pt' ? 'is-clicked' : '']"
                            @click="setLocale('ptBR'); animateClick('lang-pt')"
                        >PT-BR</button>
                    </div>
                    <button
                        class="click-pop rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white transition-all hover:bg-primary/90 sm:px-5 sm:text-sm"
                        :class="{ 'is-clicked': pressedItem === 'cta-top' }"
                        @click="scrollToSection('waitlist', 'cta-top')"
                    >
                        {{ t.cta }}
                    </button>
                </div>
            </div>
        </header>

        <main>
            <section class="bg-grid relative overflow-hidden px-4 pb-14 pt-12 sm:px-6 sm:pb-24 sm:pt-20">
                <div class="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div class="animate-slide-up flex flex-col gap-6 sm:gap-8">
                        <div
                            class="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                            <span class="relative flex h-2 w-2">
                                <span
                                    class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                                <span class="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                            </span>
                            {{ t.heroBadge }}
                        </div>
                        <h1
                            class="text-3xl leading-[1.1] font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                            {{ t.heroTitle }}
                        </h1>
                        <p class="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
                            {{ t.heroDesc }}
                        </p>
                        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                            <button
                                class="click-pop flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-bold text-white transition-all hover:bg-primary/90 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
                                :class="{ 'is-clicked': pressedItem === 'hero-primary' }"
                                @click="scrollToSection('waitlist', 'hero-primary')"
                            >
                                {{ t.cta }} <span class="material-symbols-outlined">arrow_forward</span>
                            </button>
                            <button
                                class="click-pop w-full rounded-lg bg-slate-200 px-6 py-3 text-base font-bold text-slate-900 transition-all hover:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
                                :class="{ 'is-clicked': pressedItem === 'hero-secondary' }"
                                @click="scrollToSection('how-it-works', 'hero-secondary')"
                            >
                                {{ t.secondaryCta }}
                            </button>
                        </div>
                        <button
                            type="button"
                            class="click-pop w-full max-w-xl rounded-xl border border-primary/30 bg-primary/10 p-4 text-left transition-all hover:border-primary/50"
                            :class="{ 'is-clicked': pressedItem === 'hero-offer' }"
                            @click="scrollToSection('waitlist', 'hero-offer')"
                        >
                            <p class="text-sm font-semibold text-primary sm:text-[15px]">{{ t.heroOffer }}</p>
                        </button>
                    </div>
                    <div class="relative lg:block">
                        <div class="pipeline-container pipeline-container--hero animate-float">
                            <div class="flow-caption flow-caption--left">Stripe events</div>
                            <div class="flow-caption flow-caption--center">Transform and validate</div>
                            <div class="flow-caption flow-caption--right">Google Sheets export</div>
                            <div class="sources">
                                <div class="node"><span class="material-symbols-outlined text-primary">api</span></div>
                                <div class="node"><span class="material-symbols-outlined text-primary">webhook</span></div>
                                <div class="node"><span class="material-symbols-outlined text-primary">payments</span></div>
                            </div>

                            <div class="conveyor">
                                <div class="conveyor-light"></div>
                            </div>

                            <div class="data-chunk"></div>
                            <div class="data-chunk data-chunk-2"></div>
                            <div class="data-chunk data-chunk-3"></div>

                            <div class="processor">
                                <div class="processing-tag">{{ t.processing }}</div>
                                <span class="material-symbols-outlined text-4xl text-primary">account_tree</span>
                            </div>

                            <div class="destinations">
                                <div class="node"><span class="material-symbols-outlined text-green-400">grid_on</span></div>
                                <div class="node"><span class="material-symbols-outlined text-blue-400">storage</span></div>
                                <div class="node"><span class="material-symbols-outlined text-orange-400">cloud</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="border-y border-slate-200 bg-slate-50 px-4 py-14 dark:border-slate-800 dark:bg-slate-900/30 sm:px-6 sm:py-24"
                :class="{ 'section-focus': focusSectionId === 'features' }"
                id="features">
                <div class="mx-auto max-w-7xl">
                    <div class="mb-10 max-w-2xl sm:mb-16">
                        <h2 class="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">{{ t.problemTitle }}</h2>
                        <p class="text-slate-600 dark:text-slate-400">{{ t.problemDesc }}</p>
                    </div>
                    <div class="grid gap-8 md:grid-cols-3">
                        <div v-for="point in painPoints" :key="point.icon"
                            class="rounded-xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-800">
                            <span class="material-symbols-outlined mb-4 text-red-500">{{ point.icon }}</span>
                            <h3 class="mb-2 text-xl font-bold">{{ currentLocale === "en" ? point.enTitle : point.ptTitle
                                }}</h3>
                            <p class="text-sm text-slate-600 dark:text-slate-400">{{ currentLocale === "en" ?
                                point.enDesc : point.ptDesc }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="px-4 py-14 sm:px-6 sm:py-24" :class="{ 'section-focus': focusSectionId === 'sources' }" id="sources">
                <div class="mx-auto max-w-7xl">
                    <div class="mb-10 text-center sm:mb-16">
                        <h2 class="mb-3 text-3xl font-black sm:mb-4 sm:text-4xl">{{ t.sourcesTitle }}</h2>
                        <p class="text-slate-600 dark:text-slate-400">{{ t.sourcesDesc }}</p>
                    </div>
                    <div class="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
                        <div v-for="source in sourceCards" :key="source.icon + source.title"
                            class="group flex cursor-pointer flex-col items-center gap-4 rounded-xl border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary dark:border-slate-800">
                            <div
                                class="flex size-16 items-center justify-center rounded-xl bg-slate-100 group-hover:bg-primary/10 dark:bg-slate-800">
                                <span class="material-symbols-outlined text-3xl text-primary">{{ source.icon }}</span>
                            </div>
                            <div class="text-center">
                                <p class="font-bold">{{ source.title }}</p>
                                <p class="text-xs text-slate-500">{{ source.subtitle }}</p>
                                <p class="mt-1 text-[11px] font-semibold uppercase tracking-wide" :class="source.statusClass">
                                    {{ source.status }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="bg-slate-900 px-4 py-14 text-white sm:px-6 sm:py-24">
                <div class="mx-auto max-w-7xl">
                    <div class="mb-10 text-center sm:mb-16">
                        <h2 class="mb-3 text-3xl font-black sm:mb-4 sm:text-4xl">{{ t.destinationsTitle }}</h2>
                        <p class="text-slate-400">{{ t.destinationsDesc }}</p>
                    </div>
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-4">
                        <div v-for="dest in destinations" :key="dest.icon"
                            class="flex flex-col items-center gap-4 rounded-xl border border-slate-700 bg-slate-800 p-6 transition-all duration-300 hover:-translate-y-1">
                            <span class="material-symbols-outlined text-4xl" :class="dest.color">{{ dest.icon }}</span>
                            <p class="font-bold">{{ dest.title }}</p>
                            <p class="text-xs font-semibold uppercase tracking-wide" :class="dest.statusClass">{{ dest.status }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="px-4 py-14 sm:px-6 sm:py-24" :class="{ 'section-focus': focusSectionId === 'how-it-works' }" id="how-it-works">
                <div class="mx-auto max-w-5xl">
                    <div class="mb-10 text-center sm:mb-16">
                        <h2 class="mb-3 text-3xl font-black sm:mb-4 sm:text-4xl">{{ t.stepsTitle }}</h2>
                    </div>
                    <div class="space-y-14 sm:space-y-24">
                        <div v-for="(step, idx) in steps" :key="step.title"
                            class="flex flex-col items-center gap-8 sm:gap-12 md:flex-row"
                            :class="idx === 1 ? 'md:flex-row-reverse' : ''">
                            <div class="flex-1">
                                <div
                                    class="mb-6 flex size-12 items-center justify-center rounded-full bg-primary text-xl font-black text-white shadow-lg shadow-primary/30">
                                    {{ idx + 1 }}</div>
                                <h3 class="mb-3 text-2xl font-bold sm:mb-4 sm:text-3xl">{{ step.title }}</h3>
                                <p class="text-base text-slate-600 dark:text-slate-400 sm:text-lg">{{ step.desc }}</p>
                            </div>
                            <div
                                class="w-full flex-1 rounded-2xl border border-slate-200 bg-slate-100 p-6 dark:border-slate-700 dark:bg-slate-800">
                                <div
                                    class="flex h-48 items-center justify-center overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-900">
                                    <span
                                        class="material-symbols-outlined text-6xl text-slate-400 dark:text-slate-600">{{
                                            step.icon }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="bg-primary px-4 py-14 text-white sm:px-6 sm:py-24">
                <div class="mx-auto grid max-w-7xl gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-3">
                    <div v-for="feature in featureBlocks" :key="feature[1]" class="flex flex-col gap-4">
                        <span class="material-symbols-outlined text-3xl opacity-80">{{ feature[0] }}</span>
                        <h4 class="text-xl font-bold">{{ feature[1] }}</h4>
                        <p class="text-white/80">{{ feature[2] }}</p>
                    </div>
                </div>
            </section>

            <section class="px-4 py-14 sm:px-6 sm:py-24">
                <div class="mx-auto max-w-7xl">
                    <h2 class="mb-8 text-center text-2xl font-bold sm:mb-12 sm:text-3xl">{{ t.builtForTitle }}</h2>
                    <div class="grid gap-4 sm:gap-6 md:grid-cols-5">
                        <div v-for="useCase in useCases" :key="useCase.label"
                            class="rounded-xl border border-slate-200 p-6 text-center dark:border-slate-800">
                            <span class="material-symbols-outlined mb-3 text-3xl text-primary">{{ useCase.icon }}</span>
                            <p class="font-bold text-slate-900 dark:text-white">{{ useCase.label }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section class="px-4 py-14 sm:px-6 sm:py-24" :class="{ 'section-focus': focusSectionId === 'waitlist' }" id="waitlist">
                <div
                    class="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900 p-5 text-center dark:bg-slate-800 sm:rounded-[2rem] sm:p-12">
                    <div class="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"></div>
                    <div class="relative z-10">
                        <h2 class="mb-3 text-3xl font-black text-white sm:mb-4 sm:text-4xl">{{ t.waitlistTitle }}</h2>
                        <p class="mx-auto mb-6 max-w-xl text-slate-400 sm:mb-8">{{ t.waitlistDesc }}</p>
                        <form class="mx-auto flex max-w-2xl flex-col gap-4" @submit.prevent>
                            <input
                                class="w-full rounded-xl border border-slate-600 bg-slate-800/70 px-4 py-4 text-white transition-colors placeholder:text-slate-400 focus:border-primary focus:outline-none"
                                :placeholder="t.namePlaceholder" type="text" />
                            <input
                                class="w-full rounded-xl border border-slate-600 bg-slate-800/70 px-4 py-4 text-white transition-colors placeholder:text-slate-400 focus:border-primary focus:outline-none"
                                :placeholder="t.emailPlaceholder" type="email" />
                            <textarea
                                class="w-full rounded-xl border border-slate-600 bg-slate-800/70 px-4 py-4 text-white transition-colors placeholder:text-slate-400 focus:border-primary focus:outline-none"
                                :placeholder="t.waitlistMessagePlaceholder"
                                rows="4"
                            ></textarea>
                            <button
                                class="w-full rounded-xl bg-primary px-6 py-3 text-base font-bold text-white transition-all hover:bg-primary/90 sm:text-xl"
                                type="submit">{{ t.waitlistBtn }}</button>
                        </form>
                    </div>
                </div>
            </section>
        </main>

        <footer class="border-t border-slate-200 px-4 py-10 dark:border-slate-800 sm:px-6 sm:py-12">
            <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
                <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-primary">account_tree</span>
                    <span class="text-lg font-bold tracking-tight">{{ t.brand }}</span>
                </div>
                <p class="text-xs text-slate-500">{{ t.footer }}</p>
            </div>
        </footer>

        <div
            v-if="showExitPopup"
            class="exit-overlay"
            @click.self="closeExitPopup"
        >
            <div class="exit-modal">
                <button type="button" class="exit-close" @click="closeExitPopup">×</button>
                <h3 class="text-2xl font-black text-white">{{ t.exitTitle }}</h3>
                <p class="mt-2 text-slate-300">{{ t.exitDesc }}</p>
                <form class="mt-5 flex flex-col gap-3" @submit.prevent="handleExitSubmit">
                    <input
                        class="w-full rounded-lg border border-slate-600 bg-slate-800/80 px-4 py-3 text-white placeholder:text-slate-400 focus:border-primary focus:outline-none"
                        :placeholder="t.exitNamePlaceholder"
                        type="text"
                        required
                    />
                    <input
                        class="w-full rounded-lg border border-slate-600 bg-slate-800/80 px-4 py-3 text-white placeholder:text-slate-400 focus:border-primary focus:outline-none"
                        :placeholder="t.exitEmailPlaceholder"
                        type="email"
                        required
                    />
                    <button
                        type="submit"
                        class="w-full rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90"
                    >
                        {{ t.exitBtn }}
                    </button>
                </form>
                <button type="button" class="mt-3 text-sm text-slate-400 hover:text-slate-200" @click="closeExitPopup">
                    {{ t.exitDismiss }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.bg-grid {
    background-image: radial-gradient(circle at 1px 1px, rgba(43, 124, 238, 0.05) 1px, transparent 0);
    background-size: 40px 40px;
}

.site-backdrop {
    position: relative;
    isolation: isolate;
}

.infra-bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: -1;
    opacity: 0.18;
}

.infra-node {
    position: absolute;
    border: 1px solid rgba(96, 165, 250, 0.26);
    box-shadow:
        0 0 20px rgba(37, 99, 235, 0.14),
        0 0 34px rgba(14, 165, 233, 0.08);
    backdrop-filter: blur(2px);
}

.infra-node--api {
    width: 92px;
    height: 92px;
    left: 11%;
    top: 30%;
    border-radius: 16px;
    background:
        linear-gradient(135deg, rgba(30, 64, 175, 0.3), rgba(14, 165, 233, 0.14)),
        repeating-linear-gradient(
            0deg,
            transparent 0 11px,
            rgba(125, 211, 252, 0.2) 11px 12px
        );
}

.infra-node--processor {
    width: 132px;
    height: 132px;
    left: 44%;
    top: 26%;
    border-radius: 999px;
    border-width: 2px;
    background:
        radial-gradient(circle at 30% 30%, rgba(96, 165, 250, 0.28), rgba(15, 23, 42, 0.12) 60%),
        conic-gradient(from 0deg, rgba(59, 130, 246, 0.22), transparent 45%, rgba(14, 165, 233, 0.22) 80%, transparent);
    animation: processorSpin 16s linear infinite;
}

.infra-node--cloud {
    width: 120px;
    height: 86px;
    right: 10%;
    top: 34%;
    border-radius: 44px;
    background:
        radial-gradient(circle at 24% 46%, rgba(125, 211, 252, 0.3), transparent 55%),
        radial-gradient(circle at 50% 34%, rgba(59, 130, 246, 0.22), transparent 58%),
        radial-gradient(circle at 74% 50%, rgba(14, 165, 233, 0.24), transparent 55%);
}

.infra-link {
    position: absolute;
    height: 2px;
    background: linear-gradient(90deg, rgba(125, 211, 252, 0.18), rgba(59, 130, 246, 0.7), rgba(125, 211, 252, 0.18));
}

.infra-link--a {
    left: calc(11% + 92px);
    top: calc(30% + 45px);
    width: 28%;
}

.infra-link--b {
    left: calc(44% + 132px);
    top: calc(26% + 66px);
    width: 27%;
}

.infra-pulse {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 999px;
    background: #60a5fa;
    box-shadow:
        0 0 14px rgba(96, 165, 250, 0.85),
        0 0 22px rgba(14, 165, 233, 0.45);
}

.infra-pulse--a {
    left: calc(11% + 98px);
    top: calc(30% + 40px);
    animation: pulseMoveA 4s linear infinite;
}

.infra-pulse--b {
    left: calc(44% + 138px);
    top: calc(26% + 60px);
    animation: pulseMoveB 4s linear infinite 1.4s;
}

.site-backdrop::before,
.site-backdrop::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: -1;
}

.site-backdrop::before {
    background:
        radial-gradient(900px 420px at 18% 10%, rgba(30, 64, 175, 0.18), transparent 60%),
        radial-gradient(900px 420px at 84% 14%, rgba(14, 165, 233, 0.12), transparent 62%),
        radial-gradient(1100px 520px at 50% 85%, rgba(30, 64, 175, 0.1), transparent 68%),
        linear-gradient(130deg, rgba(59, 130, 246, 0.07) 0%, transparent 28%, rgba(14, 165, 233, 0.06) 52%, transparent 74%),
        linear-gradient(180deg, #050c18 0%, #071224 44%, #071426 100%);
    filter: saturate(1.08);
}

.site-backdrop::after {
    opacity: 0.34;
    background:
        linear-gradient(105deg, transparent 0%, rgba(96, 165, 250, 0.26) 18%, transparent 36%),
        linear-gradient(106deg, transparent 20%, rgba(59, 130, 246, 0.2) 36%, transparent 52%),
        linear-gradient(107deg, transparent 44%, rgba(14, 165, 233, 0.18) 58%, transparent 72%),
        repeating-linear-gradient(
            95deg,
            transparent 0 42px,
            rgba(125, 211, 252, 0.05) 42px 44px,
            transparent 44px 84px
        );
    mix-blend-mode: screen;
    animation: backdropFlow 18s linear infinite;
}

.animate-float {
    animation: floatCard 4s ease-in-out infinite;
}

.animate-slide-up {
    animation: slideUp 0.7s ease-out both;
}

.click-pop {
    position: relative;
    transform-origin: center;
}

.click-pop::after {
    content: "";
    position: absolute;
    inset: -6px;
    border-radius: 10px;
    border: 1px solid rgba(59, 130, 246, 0);
    pointer-events: none;
}

.click-pop.is-clicked {
    animation: clickPop 0.22s ease-out;
}

.click-pop.is-clicked::after {
    animation: clickRing 0.25s ease-out;
}

.section-focus {
    animation: sectionFocusPulse 0.9s ease-out;
}

.exit-overlay {
    position: fixed;
    inset: 0;
    z-index: 90;
    background: rgba(2, 6, 23, 0.74);
    backdrop-filter: blur(2px);
    display: grid;
    place-items: center;
    padding: 1rem;
    animation: overlayFade 0.18s ease-out;
}

.exit-modal {
    position: relative;
    width: 100%;
    max-width: 460px;
    border-radius: 1rem;
    border: 1px solid rgba(59, 130, 246, 0.4);
    background: linear-gradient(180deg, #0f172a 0%, #111c35 100%);
    padding: 1.25rem;
    box-shadow:
        0 24px 60px rgba(2, 6, 23, 0.65),
        0 0 36px rgba(59, 130, 246, 0.2);
    animation: modalIn 0.24s ease-out;
}

.exit-close {
    position: absolute;
    right: 10px;
    top: 8px;
    border: none;
    background: transparent;
    color: #94a3b8;
    font-size: 1.4rem;
    line-height: 1;
    cursor: pointer;
}

.pipeline-container {
    position: relative;
    width: 100%;
    max-width: 860px;
    height: 320px;
    margin: 0 auto;
    border: 1px solid rgb(30 41 59);
    border-radius: 20px;
    background: radial-gradient(circle at center, #111827 0%, #0a0e17 100%);
    overflow: hidden;
}

.pipeline-container--hero {
    height: 420px;
    border: 1px solid rgba(59, 130, 246, 0.4);
    background:
        radial-gradient(circle at 50% 45%, rgba(30, 64, 175, 0.45) 0%, rgba(10, 14, 23, 1) 72%),
        linear-gradient(180deg, #0f1f3a 0%, #0a0e17 100%);
    box-shadow:
        0 0 0 1px rgba(59, 130, 246, 0.2) inset,
        0 32px 60px rgba(2, 6, 23, 0.65),
        0 0 48px rgba(59, 130, 246, 0.22);
}

.flow-caption {
    position: absolute;
    top: 10px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #93c5fd;
    padding: 4px 7px;
    border-radius: 999px;
    border: 1px solid rgba(96, 165, 250, 0.35);
    background: rgba(30, 58, 138, 0.22);
}

.flow-caption--left {
    left: 10px;
}

.flow-caption--center {
    left: 50%;
    transform: translateX(-50%);
}

.flow-caption--right {
    right: 10px;
}

.sources {
    position: absolute;
    left: 22px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.node {
    width: 44px;
    height: 44px;
    background: linear-gradient(180deg, #22314d 0%, #1b2942 100%);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(96, 165, 250, 0.22);
    box-shadow: 0 8px 22px rgba(2, 6, 23, 0.5);
}

.conveyor {
    position: absolute;
    top: 50%;
    left: 70px;
    right: 70px;
    height: 4px;
    background: rgba(59, 130, 246, 0.18);
    transform: translateY(-50%);
}

.conveyor-light {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, transparent, #60a5fa, #3b82f6, transparent);
    animation: flow 2s linear infinite;
}

.data-chunk {
    position: absolute;
    width: 20px;
    height: 20px;
    background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%);
    border-radius: 4px;
    top: 50%;
    left: 110px;
    transform: translateY(-50%);
    box-shadow: 0 0 16px rgba(59, 130, 246, 0.95);
    animation: moveData 3s linear infinite;
}

.data-chunk-2 {
    animation-delay: 1s;
}

.data-chunk-3 {
    animation-delay: 2s;
}

.processor {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background: radial-gradient(circle at 35% 30%, #172a4d 0%, #0f172a 70%);
    border: 3px solid #60a5fa;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    box-shadow:
        0 0 30px rgba(96, 165, 250, 0.5),
        0 0 70px rgba(59, 130, 246, 0.25);
}

.processing-tag {
    position: absolute;
    top: -40px;
    background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
    color: white;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    animation: pulse 1.5s infinite;
}

.destinations {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 12px;
}

@media (min-width: 768px) {
    .pipeline-container {
        height: 400px;
    }

    .flow-caption {
        font-size: 11px;
        padding: 6px 9px;
        top: 20px;
    }

    .flow-caption--left {
        left: 22px;
    }

    .flow-caption--right {
        right: 22px;
    }

    .sources {
        left: 50px;
        gap: 20px;
    }

    .node {
        width: 60px;
        height: 60px;
    }

    .conveyor {
        left: 110px;
        right: 110px;
    }

    .destinations {
        right: 50px;
        gap: 20px;
    }
}

@keyframes floatCard {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-8px);
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(16px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes flow {
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(100%);
    }
}

@keyframes moveData {
    0% {
        left: 110px;
        opacity: 0;
        transform: translateY(-50%) scale(0.5);
    }

    20% {
        opacity: 1;
        transform: translateY(-50%) scale(1);
    }

    45% {
        left: 50%;
        transform: translate(-50%, -50%) rotate(180deg);
    }

    55% {
        left: 50%;
        transform: translate(-50%, -50%) rotate(360deg);
    }

    100% {
        left: calc(100% - 190px);
        opacity: 0;
    }
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.6;
    }
}

@keyframes fillCell {

    0%,
    50% {
        background: #064e3b;
    }

    60%,
    100% {
        background: #10b981;
    }
}

@keyframes clickPop {
    0% {
        transform: scale(1);
    }
    45% {
        transform: scale(0.92);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes clickRing {
    0% {
        border-color: rgba(59, 130, 246, 0.6);
        transform: scale(0.9);
        opacity: 1;
    }
    100% {
        border-color: rgba(59, 130, 246, 0);
        transform: scale(1.05);
        opacity: 0;
    }
}

@keyframes sectionFocusPulse {
    0% {
        box-shadow: inset 0 0 0 0 rgba(59, 130, 246, 0);
    }
    35% {
        box-shadow: inset 0 0 0 2px rgba(59, 130, 246, 0.45);
    }
    100% {
        box-shadow: inset 0 0 0 0 rgba(59, 130, 246, 0);
    }
}

@keyframes backdropFlow {
    from {
        transform: translate3d(-2%, 0, 0);
    }
    to {
        transform: translate3d(2%, 0, 0);
    }
}

@keyframes processorSpin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes pulseMoveA {
    0% {
        transform: translateX(0);
        opacity: 0;
    }
    15% {
        opacity: 1;
    }
    85% {
        opacity: 1;
    }
    100% {
        transform: translateX(28vw);
        opacity: 0;
    }
}

@keyframes pulseMoveB {
    0% {
        transform: translateX(0);
        opacity: 0;
    }
    15% {
        opacity: 1;
    }
    85% {
        opacity: 1;
    }
    100% {
        transform: translateX(27vw);
        opacity: 0;
    }
}

@keyframes overlayFade {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes modalIn {
    from {
        opacity: 0;
        transform: translateY(10px) scale(0.97);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
</style>