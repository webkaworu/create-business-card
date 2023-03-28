<template>
	<Head title="確認" />
	<section class="container confirm-section mb-4">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<div class="canvas" v-html="card"></div>
			</div>
		</div>
		<div class="row justify-content-center mt-5">
			<div class="col-md-4 mb-4">
				<Link :href="route('edit')" class="btn btn-lg btn-light d-block w-100">修正する</Link>
			</div>
			<div class="col-md-4 mb-4">
				<button class="btn btn-lg btn-primary d-block w-100">ダウンロード</button>
			</div>
		</div>
		<div class="row justify-content-center">
			<div class="col-md-4">
				<Link :href="route('home')" class="btn btn-lg btn-success d-block w-100">TOPに戻る</Link>
			</div>
		</div>
	</section>
</template>

<script setup>
import { Head, Link } from "@inertiajs/vue3";
defineProps({
	card: String,
});
</script>
