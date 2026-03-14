import time
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1280, "height": 800})

    print("Navigating to http://localhost:8080...")
    page.goto("http://localhost:8080")

    # Wait for the editor to load
    page.wait_for_selector('text="System Editor"', timeout=10000)

    # Try to click 'SHOW PREVIEW' using a more robust selector if needed
    try:
        button = page.locator('button', has_text="SHOW PREVIEW")
        if button.is_visible():
            button.click()
            time.sleep(1)
            print("Clicked SHOW PREVIEW button")
    except Exception as e:
        print("Could not find/click SHOW PREVIEW button", e)

    print("Clicking template selector...")
    page.click('button[role="combobox"]')
    print("Selecting Simple...")
    page.click('div[role="option"]:has-text("Simple")')

    # Take screenshot of Simple template
    time.sleep(2)
    page.screenshot(path="simple_template_with_preview.png")
    print("Saved simple_template_with_preview.png")

    # Switch to Executive template
    print("Clicking template selector...")
    page.click('button[role="combobox"]')

    print("Selecting Executive...")
    page.click('div[role="option"]:has-text("Executive")')

    # Wait for the template to update
    time.sleep(2)
    page.screenshot(path="executive_template_with_preview.png")
    print("Saved executive_template_with_preview.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)