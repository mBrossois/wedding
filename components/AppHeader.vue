<template>
    <header class="header px-1">
        <div class="header-body">
            <p class="lavishly-yours-regular logo">Mark & Emma's wedding</p>
        </div>
        <div class="line"></div>
    </header>
</template>

<style scoped>
.logo {
    font-size: 32px;
}

.header-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px;
}

.header .line {
    height: 1px;
    width: 100%;
    background-color: var(--gray-medium);
    border-radius: 15px;
}
</style>