<template>
		<section class="container my-auto text-center">
		<h2>{{ title }}</h2>
		<p class="my-5">{{ description }}</p>
		<div class="row justify-content-center">
			<div class="col-md-4">
				<Link :href="route('home')" class="btn btn-lg btn-success d-block w-100">TOPに戻る</Link>
			</div>
		</div>
	</section>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import { computed } from 'vue'

const props = defineProps({ status: Number })

const title = computed(() => {
	return {
		503: 'サービスは利用できません',
		500: 'サーバーエラー',
		404: 'ページが見つかりません',
		403: 'アクセスできません',
	}[props.status]
})

const description = computed(() => {
	return {
		503: '只今メンテナンスを行っています。 ',
		500: 'サーバーで問題が発生しました。',
		404: 'お探しのページは見つかりませんでした。',
		403: 'このページへのアクセスは禁止されています。',
	}[props.status]
})
</script>
