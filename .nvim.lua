vim.api.nvim_create_autocmd("User", {
	pattern = "VeryLazy",
	once = true,
	callback = function()
		local conform = require("conform")
		local ft = conform.formatters_by_ft
		ft.javascript = { "prettier" }
		ft.javascriptreact = { "prettier" }
		ft.typescript = { "prettier" }
		ft.typescriptreact = { "prettier" }
		ft.json = { "prettier" }
		ft.markdown = { "prettier" }
		ft.css = { "prettier" }
		ft.scss = { "prettier" }
		ft.html = { "prettier" }
		ft.yaml = { "prettier" }
		ft.graphql = { "prettier" }
		ft.less = { "prettier" }
		ft.vue = { "prettier" }

		vim.lsp.config["astro"] = {}
		vim.lsp.enable("astro")
	end,
})
