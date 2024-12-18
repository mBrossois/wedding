<template>
     <LMap
        style="height: 300px"
        class="map"
        :zoom="16"
        :options="{ zoomControl: false }"
        :center="vaesharteltLocation"
        :use-global-leaflet="false"
    >
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
            layer-type="base"
            name="OpenStreetMap"
        />
        <LMarker :lat-lng="vaesharteltLocation">
            <LPopup> 
                <AppSpan text="Vaeshartelt"/>
                <br>
                <AppSpan text="Weert 9, 6222 PG Maastricht," />
                <br>
                <AppSpan :text="$t('NETHERLAND')" />
                <br>
                <AppLink text="Get directions." to="https://maps.app.goo.gl/GLuKY4sqiThHTziN9" target="_blank"/>
            </LPopup>
        </LMarker>
        <LControlZoom position="bottomright" />
    </LMap>
</template>

<script setup lang="ts">
const vaesharteltLocation: any = [50.879398, 5.726370]
</script>

<style>
.map {
    border-radius: 50px;
    border: 1px solid var(--gray-medium)
}
</style>