<template>
	<div class="panel-text">
		<div class="mb-2 row">
			<div class="col-6">
				<button type="button" class="btn btn-secondary d-block w-100" @click="addText()">下の文字を追加</button>
			</div>
			<div class="col-6">
				<button type="button" class="btn btn-secondary d-block w-100" @click="changeText()">下の文字に変更</button>
			</div>
		</div>
		<textarea name="str" class="form-control" rows="5"></textarea>
	</div>
</template>

<script setup>

const props = defineProps({
	operation: Object,
});

const addText = () => props.operation.addText();
const changeText = (state) => props.operation.changeText();
</script>
