<template>
	<section class="container mb-4">
		<div class="row">
			<div class="col-sm-6 col-lg-4 mb-4" v-for="(value, key) in cards">
				<Link :href="route('edit', {'card': key })" class="svg-archive-frame">
					<div class="svg-box" v-html="value"></div>
					<button role="button" class="btn btn-success mt-2 d-block mx-auto">編集する</button>
				</Link>
			</div>
		</div>
	</section>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";

defineProps({
	cards: Array,
});
</script>
