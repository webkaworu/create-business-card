<template>
	<Head title="確認" />
	<section class="container confirm-section mb-4">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<div class="canvas">
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 258 156" ref="svg" v-html="design"></svg>
				</div>
			</div>
		</div>
		<div class="row justify-content-center mt-5">
			<div class="col-md-4 mb-4">
				<Link :href="route('edit', { 'card': card_number })" class="btn btn-lg btn-light d-block w-100">修正する</Link>
			</div>
			<div class="col-md-4 mb-4">
				<button class="btn btn-lg btn-primary d-block w-100" @click="download">ダウンロード</button>
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
import { ref } from 'vue';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

const params = new URLSearchParams(window.location.search);
const card_number = params.get('card');

const storage = JSON.parse(sessionStorage.getItem('svg'));
const design = storage[storage.length - 1];

const svg = ref(null);
const download = async () => {
	const canvas = await html2canvas(svg.value, {
		width: 2000,
		height: 1208
	});
	canvas.toBlob(function (blob) {
		saveAs(blob, 'card.png');
	});
}


</script>
