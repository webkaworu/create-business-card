<template>
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 258.1 155.9">
		<defs id="SvgjsDefs1002">
			<pattern id="pattern" :x="x" :y="y" :width="width" :height="height" patternUnits="userSpaceOnUse">
				<rect id="SvgjsRect1011" width="100" height="100" fill="#ffffff" stroke="#ff0000" stroke-width="0.2"></rect>
			</pattern>
		</defs>
		<rect id="grid" width="100%" height="100%" fill="url(#pattern)"></rect>
	</svg>
</template>
<script setup>
defineProps({
	x: Number,
	y: Number,
	width: Number,
	height: Number,
});

</script>
