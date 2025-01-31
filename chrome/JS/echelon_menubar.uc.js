// ==UserScript==
// @name			Echelon :: Menu Bar
// @description 	Links title bar visibility to menu bar visibility in Strata.
// @author			aubymori
// @include			main
// ==/UserScript==

{
    var { waitForElement } = ChromeUtils.import("chrome://userscripts/content/echelon_utils.uc.js");
    waitForElement = waitForElement.bind(window);

    let tabsintitlebar = document.getElementById("toolbar-menubar").getAttribute("autohide") == "true";

    function menuBarMutation(list)
    {
        for (const mut of list)
        {
			let root = document.documentElement;
			let theme = PrefUtils.tryGetIntPref("Echelon.Appearance.Style");
            let autohide = mut.target.getAttribute("autohide") == "true";
            if (theme < ECHELON_LAYOUT_AUSTRALIS)
            {
                gCustomizeMode.toggleTitlebar(!autohide);
            }
        }
    }

    waitForElement("#toolbar-menubar").then(menubar => {
        let observer = new MutationObserver(menuBarMutation);
        observer.observe(
            menubar,
            {
                attributes: true,
                attributeFilter: ["autohide"]
            }
        );
    });
}