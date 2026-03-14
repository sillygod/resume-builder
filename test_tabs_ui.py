from playwright.sync_api import sync_playwright

def verify_tabs_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('http://localhost:3001')
        page.wait_for_selector('text=System Editor')

        # Take a screenshot focused on the tabs. Use nth(0) to get the first tablist (System Editor/AI Core)
        tabs_element = page.locator('div[role="tablist"]').nth(0)
        tabs_element.screenshot(path='/home/jules/verification/tabs_ui.png', type='png')

        # Also grab a slightly larger context view
        context_element = page.locator('div[role="tablist"]').nth(0).locator('..')
        context_element.screenshot(path='/home/jules/verification/tabs_ui_context.png', type='png')

        browser.close()

if __name__ == "__main__":
    verify_tabs_ui()
