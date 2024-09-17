<template>
    <svg class="arrow" width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="path" style="--delay: 0ms; --stroke: 40;" d="M1 5H16" stroke="black" stroke-linecap="round"/>
        <path class="path" style="--delay: 200ms; --stroke: 20;" d="M11.5 1C11.5 2.95262 16.5 5 16.5 5C16.5 5 11.5 7.04738 11.5 9" stroke="black" stroke-linecap="round"/>
    </svg>
</template>

<style scoped>
.arrow {
    overflow: visible;

    transition: transform 200ms ease-in-out 200ms;
}
.path {
    stroke-dasharray: var(--stroke);
    stroke-dashoffset: var(--stroke);

    transition: all 200ms ease-in-out calc(200ms - var(--delay));
}
</style>