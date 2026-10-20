"""Optional browser smoke checks. Requires Python Playwright and local Chrome.
Run the Vite server first, then: python scripts/browser-check.py
"""
from playwright.sync_api import sync_playwright
import json

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/opt/google/chrome/chrome', headless=True, args=['--no-sandbox', '--enable-unsafe-swiftshader'])
    page = browser.new_page(viewport={'width':1440,'height':1000}, reduced_motion='reduce')
    errors=[]
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.goto('http://127.0.0.1:5173', wait_until='networkidle')
    page.get_by_role('heading',name='Autonomous AI Robotics Lab.').wait_for()
    page.screenshot(path='/tmp/autonomous-desktop.png',full_page=True)
    page.get_by_role('link',name='Mission Control',exact=True).click()
    page.get_by_role('button',name='Start demo').click()
    assert page.locator('.mission-banner strong').inner_text()=='Navigating'
    page.get_by_role('button',name='Advance scenario').click()
    assert page.locator('.mission-banner strong').inner_text()=='Inspecting'
    page.get_by_role('button',name='Advance scenario').click()
    assert page.locator('.mission-banner strong').inner_text()=='Completed'
    page.get_by_role('button',name='Reset mission demo').click()
    assert page.locator('.mission-banner strong').inner_text()=='Idle'
    with page.expect_download() as download:
        page.get_by_role('button',name='Export demo').click()
    assert download.value.suggested_filename=='robotics-lab-demo.json'
    page.get_by_role('link',name='Computer Vision',exact=True).click()
    page.get_by_role('button',name='Load sample annotations').click()
    page.locator('.bbox').first.wait_for()
    assert page.locator('.bbox').count()==2
    page.get_by_role('button',name='Select Inspection valve').click()
    assert 'selected' in page.get_by_role('button',name='Select Inspection valve').get_attribute('class')
    page.get_by_role('link',name='Research & Experiments',exact=True).click()
    for key in ['success','missionTime','precision','latency','interventions']:
        page.get_by_label('Research metric').select_option(key)
        assert page.get_by_label('Research metric').input_value()==key
    page.get_by_role('link',name='System Architecture',exact=True).click()
    page.get_by_role('button',name='React Dashboard').click()
    page.get_by_role('heading',name='React Dashboard',exact=True).wait_for()
    page.get_by_role('link',name='Simulation Viewer',exact=True).click()
    page.locator('canvas').wait_for()
    page.get_by_role('button',name='Animate robot').click()
    page.get_by_role('button',name='Pause preview').wait_for()
    page.get_by_role('button',name='Reset camera').click()
    page.get_by_role('link',name='Documentation',exact=True).click()
    page.get_by_role('heading',name='Documentation',exact=True).wait_for()
    page.set_viewport_size({'width':390,'height':844})
    page.goto('http://127.0.0.1:5173/')
    page.get_by_role('button',name='Open navigation').click()
    page.get_by_role('link',name='Mission Control',exact=True).click()
    assert page.locator('h1').inner_text()=='Mission Control'
    assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
    page.screenshot(path='/tmp/autonomous-mobile.png',full_page=True)
    page.goto('http://127.0.0.1:5173/unknown')
    page.get_by_role('heading',name='Page not found').wait_for()
    assert not errors, errors
    print(json.dumps({'status':'passed','checks':['navigation','mission states and reset','JSON export','vision loading and selection','research metrics','architecture selection','3D controls','mobile menu and overflow','404'],'page_errors':errors}))
    browser.close()
