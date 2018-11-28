import { configure } from '@storybook/react';

function loadStories(stories) {
  stories.keys().forEach(stories);
}

configure(loadStories(require.context('../src/stories', true, /.stories.jsx$/)), module);
