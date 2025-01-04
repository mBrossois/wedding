<template>
    <svg width="100" height="100" viewBox="0 0 258 116" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9878 99.0122C-5.6626 76.3618 -5.6626 39.6382 16.9878 16.9878C39.6382 -5.66259 76.3618 -5.66259 99.0122 16.9878L128.711 46.6863L158.409 16.9878C181.06 -5.6626 217.783 -5.6626 240.434 16.9878C263.084 39.6382 263.084 76.3618 240.434 99.0122C217.783 121.663 181.06 121.663 158.409 99.0122L128.711 69.3137L99.0122 99.0122C76.3618 121.663 39.6382 121.663 16.9878 99.0122ZM117.397 58L87.6985 28.3015C71.2965 11.8995 44.7035 11.8995 28.3015 28.3015C11.8995 44.7035 11.8995 71.2965 28.3015 87.6985C44.7035 104.101 71.2965 104.101 87.6985 87.6985L117.397 58ZM140.024 58L169.723 87.6985C186.125 104.101 212.718 104.101 229.12 87.6985C245.522 71.2965 245.522 44.7035 229.12 28.3015C212.718 11.8995 186.125 11.8995 169.723 28.3015L140.024 58Z"/>
    </svg>
</template>

<style scoped>
svg {
    overflow: visible;
}

path {
    fill: transparent;
    stroke: var(--gray-darkest);
    stroke-width: 10px;
    stroke-dasharray: 200;
    animation: moveAround 10s ease-in-out alternate-reverse infinite;
}

@keyframes moveAround {
    from {
        stroke-dashoffset: 0;
    } to {
        stroke-dashoffset: 1000;
    }
}

</style>