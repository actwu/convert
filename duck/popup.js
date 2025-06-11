(function conEmWrapper() {
const isExtension = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;
const isExtensionPage = location.protocol === 'chrome-extension:' || location.protocol === 'moz-extension:';
const isContentScript = isExtension && document instanceof HTMLDocument && !isExtensionPage;

function conEm() {
const emailInput = document.querySelector('#fshio');
const aliasInput = document.querySelector('#rfthk');

if (!emailInput || !aliasInput) {
console.warn('Required elements #fshio and #rfthk not found.');
return;
}

const aliasVal = aliasInput.value.trim();
const baseEmail = emailInput.value.trim().split('@')[0];
const duckEmail = `${baseEmail}@duck.com`;

emailInput.value = duckEmail;

if (aliasVal.includes('_at_')) {

const [prefix, domainAndDuck] = aliasVal.split('_at_');
const domain = domainAndDuck.split(`_${duckEmail}`)[0];
aliasInput.value = `${prefix}@${domain}`;
} else {
const [prefix, domain] = aliasVal.split('@');
if (prefix && domain) {
aliasInput.value = `${prefix}_at_${domain}_${duckEmail}`;
}
}
}

function init() {
const triggerBtn = document.querySelector('#conEm');
if (triggerBtn) {
triggerBtn.addEventListener('mousedown', conEm);
} else {
console.warn('Button #conEm not found.');
}
}

if (isExtensionPage || isContentScript) {
console.log('Running in extension context');
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', init);
} else {
init();
}
} else {
console.log('Not in extension context. Skipping script.');
}
})();
