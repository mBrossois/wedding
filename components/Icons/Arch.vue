<template>
    <svg width="363" height="262" viewBox="0 0 363 262" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="path" d="M3.67528 261C3.67528 261 -37.9999 1 181.5 1C401 1 359.325 261 359.325 261" stroke="url(#paint0_linear_201_28)" stroke-linecap="round"/>
        <defs>
            <linearGradient id="paint0_linear_201_28" x1="362.481" y1="131" x2="0.518555" y2="131" gradientUnits="userSpaceOnUse">
                <stop stop-color="#E8E5E5"/>
                <stop offset="0.1" stop-color="#C9C6C6"/>
                <stop offset="0.5" stop-color="#C9C6C6"/>
                <stop offset="0.9" stop-color="#C9C6C6"/>
                <stop offset="1" stop-color="#E8E5E5"/>
            </linearGradient>
        </defs>
    </svg>
</template>

<style scoped>
.path {
    stroke-dasharray: 650;
    stroke-dashoffset: 650;

    animation: draw 1500ms ease-in-out forwards;
}

@keyframes draw {
    to {
        stroke-dashoffset: 0;
    }
}
</style>