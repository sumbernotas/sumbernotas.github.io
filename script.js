document.addEventListener('DOMContentLoaded', () => {
 /**
  * Initializes a single tab component.
  * @param {HTMLElement} tabContainer - The .tabs-container element.
  */
 const setupTabComponent = (tabContainer) => {
  const tablist = tabContainer.querySelector('[role="tablist"]');
  if (!tablist) return;

  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));

  const switchTab = (newTab) => {
   if (!newTab || newTab.getAttribute('aria-selected') === 'true') {
 return; // Do nothing if already active
   }

   const currentActiveTab = tablist.querySelector('[aria-selected="true"]');

   if (currentActiveTab) {
 currentActiveTab.classList.remove('active');
 currentActiveTab.setAttribute('aria-selected', 'false');
 currentActiveTab.setAttribute('tabindex', '-1');
 const currentPanelId = currentActiveTab.getAttribute('aria-controls');
 const currentPanel = tabContainer.querySelector(`#${currentPanelId}`);
 if (currentPanel) {
  currentPanel.classList.remove('active');
 }
   }

   newTab.classList.add('active');
   newTab.setAttribute('aria-selected', 'true');
   newTab.setAttribute('tabindex', '0');
   const newPanelId = newTab.getAttribute('aria-controls');
   const newPanel = tabContainer.querySelector(`#${newPanelId}`);
   if (newPanel) {
 newPanel.classList.add('active');
   }
   newTab.focus({ preventScroll: true });
  };

  // Use event delegation for click handling.
  tablist.addEventListener('click', (e) => {
   const tab = e.target.closest('[role="tab"]');
   
   if (tab && tab.closest('[role="tablist"]') === tablist) {
 switchTab(tab);
   }
  });

  // Add keyboard navigation to the tab list.
  tablist.addEventListener('keydown', (e) => {
   const tab = e.target.closest('[role="tab"]');

   if (!tab || tab.closest('[role="tablist"]') !== tablist) {
 return;
   }

   const currentIndex = tabs.indexOf(tab);
   if (currentIndex === -1) return;

   let nextIndex = -1;
   if (e.key === 'ArrowRight') {
 e.preventDefault();
 if (currentIndex < tabs.length - 1) {
  nextIndex = currentIndex + 1;
 }
   } else if (e.key === 'ArrowLeft') {
 e.preventDefault();
 if (currentIndex > 0) {
  nextIndex = currentIndex - 1;
 }
   } else if (e.key === 'Home') {
 e.preventDefault();
 nextIndex = 0;
   } else if (e.key === 'End') {
 e.preventDefault();
 nextIndex = tabs.length - 1;
   }
   
   if (nextIndex !== -1) {
 e.stopPropagation();
 switchTab(tabs[nextIndex]);
   }
  });
 };

 // Initialize all tab components on the page.
 document.querySelectorAll('.tabs-container').forEach(setupTabComponent);
});