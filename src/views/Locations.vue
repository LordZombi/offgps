<template>
    <div class="text-center">
        <h1>Locations</h1>
        <pre class="pre">{{ $offlineStorage.get('locations') }}</pre>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.pre {
    margin: 0 auto;
    display: inline-block;
    text-align: left;
}
</style>
