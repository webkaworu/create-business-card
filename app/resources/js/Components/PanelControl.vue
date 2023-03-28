<template>
	<div class="bg-primary p-2 text-center">
		<fieldset>
				<legend>配置</legend>
				<div>
					<table class="ctl-position">
						<tr>
							<td><button type="button" data-position="left">左寄</button></td>
							<td><button type="button" data-position="center">左右中央</button></td>
							<td><button type="button" data-position="right">右寄</button></td>
						</tr>
						<tr>
							<td><button type="button" data-position="bottom">下寄</button></td>
							<td><button type="button" data-position="middle">上下中央</button></td>
							<td><button type="button" data-position="top">上寄</button></td>
						</tr>
					</table>
				</div>
		</fieldset>
		<fieldset>
			<legend>グリッド</legend>
			<div class="text-center">
				<label class="fw-bold"><input type="radio" name="grid" value="off" :checked="grid.switch == 'off'" @change="$emit('changeGridEvent', { switch: 'off'})">OFF</label>
				<label class="fw-bold ms-2"><input type="radio" name="grid" value="on" :checked="grid.switch == 'on'" @change="$emit('changeGridEvent', { switch: 'on'})">ON</label>
				<table class="ctl-grid" :class="{'d-none': grid.switch == 'off'}">
					<thead>
						<tr>
							<td></td>
							<td>間隔</td>
							<td></td>
							<td>移動</td>
							<td></td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>水平</td>
							<td>
								<button type="button" @click="$emit('changeGridEvent', { width: ((grid.width > 0)? grid.width - 1: 0) })">&lt;</button>
								<button type="button" @click="$emit('changeGridEvent', { width: grid.width + 1 })">&gt;</button>
							</td>
							<td>{{ grid.width }}</td>
							<td>
								<button type="button" @click="$emit('changeGridEvent', { x: grid.x - 1 })">-</button>
								<button type="button" @click="$emit('changeGridEvent', { x: grid.x + 1 })">+</button>
							</td>
							<td>{{ grid.x }}</td>
						</tr>
						<tr>
							<td>垂直</td>
							<td>
								<button type="button" @click="$emit('changeGridEvent', { height: ((grid.height > 0) ? grid.height - 1 : 0) })">&lt;</button>
								<button type="button" @click="$emit('changeGridEvent', { height: grid.height + 1 })">&gt;</button>
							</td>
							<td>{{ grid.height }}</td>
							<td>
								<button type="button" @click="$emit('changeGridEvent', { y: grid.y - 1 })">-</button>
								<button type="button" @click="$emit('changeGridEvent', { y: grid.y + 1 })">+</button>
							</td>
							<td>{{ grid.y }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</fieldset>
		<fieldset>
			<legend>選択中のブロック</legend>
			<div>
				<button type="button" id="delete">削除する</button>
			</div>
		</fieldset>
		<div class="p-1 my-1">
			<button type="button" id="back">操作取り消し</button>
			<button type="button" id="advance" class="ms-2">操作やり直し</button>
		</div>
		<div class="p-1 mt-2 bg-warning">
			<Link :href="route('home')" as="button" type="button">編集を中止する</Link>
		</div>
	</div>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";

defineProps({
	grid: Object,
});

defineEmits(['changeGridEvent']);

</script>
