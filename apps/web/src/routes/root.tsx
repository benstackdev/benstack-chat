import { ThemeProvider } from "@/contexts/theme-provider";
import { Outlet } from "react-router";

function Root() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Outlet />
		</ThemeProvider>
	);
}

export default Root;
