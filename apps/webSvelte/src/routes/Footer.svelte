<script>
	import Logo from '$lib/icons/Logo.svelte';
</script>

<footer class=" bg-background-darker">
	<div class="mx-auto w-full max-w-screen-xl">
		<hr class="py-2" />
		<div class="grid grid-cols-1 gap-8 px-4 md:grid-cols-3">
			<div class="px-4">
				<Logo />
			</div>
			<div class="mb-8 text-xl font-semibold text-center text-neutral-lighter">
				<div>
					Built with <a href="https://twitter.com/proto_kit" class="underline">Proto-kit</a>
				</div>
				<div>Secured by <a href="https://twitter.com/MinaProtocol" class="underline">Mina</a></div>
			</div>
			<div>
				<ul class="grid grid-cols-2 gap-y-6 float-right">
					<li class="px-4">
						<a href="#" class="hover:underline">
							<img src="/img/Discord.png" alt="" class="h-[60px] w-[60px] object-cover" />
						</a>
					</li>
					<li class="px-4">
						<a href="#" class="hover:underline">
							<img src="/img/Twitter.png" alt="" class="h-[60px] w-[60px] object-cover" />
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</footer>
