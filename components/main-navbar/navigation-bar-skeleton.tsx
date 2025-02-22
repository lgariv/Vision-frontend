export default function NavbarSkeleton() {
	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 z-20 bg-transparent backdrop-blur font-heebo">
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-4">
					<h1 className="text-4xl font-bold text-primary font-pixelify">
						VISION
					</h1>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex md:items-center md:gap-5 lg:gap-6">
						{[...Array(3)].map((_, i) => (
							<div
								key={`nav-item-${i}`}
								className="h-4 w-20 bg-muted-foreground rounded animate-pulse opacity-25"
								style={{ animationDelay: `${i * 0.1}s` }}
							/>
						))}
					</nav>
				</div>

				{/* Desktop Controls */}
				<div className="hidden md:flex items-center gap-4">
					<div className="h-10 w-[180px] bg-muted-foreground rounded-md animate-pulse opacity-25" />
					<div
						className="h-10 w-[200px] bg-muted-foreground rounded-md animate-pulse opacity-25"
						style={{ animationDelay: "0.2s" }}
					/>
					<div
						className="h-10 w-10 bg-muted-foreground rounded-md animate-pulse opacity-25"
						style={{ animationDelay: "0.3s" }}
					/>
					<div
						className="h-10 w-10 bg-muted-foreground rounded-full animate-pulse opacity-25"
						style={{ animationDelay: "0.4s" }}
					/>
				</div>

				{/* Mobile Menu Button */}
				<div className="md:hidden h-6 w-6 bg-muted-foreground rounded animate-pulse opacity-25" />
			</div>
		</header>
	);
}
