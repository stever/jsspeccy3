export const actionTypes = {
    renderEmulator: 'jsspeccy/renderEmulator',
    handleClick: 'jsspeccy/handleClick',
    reset: 'jsspeccy/reset',
    pause: 'jsspeccy/pause',
    exit: 'jsspeccy/exit',
    showOpenFileDialog: 'jsspeccy/openFileDialog',
};

export const renderEmulator = (target, zoom) => ({
    type: actionTypes.renderEmulator,
    target, zoom
});

export const handleClick = (e) => ({
    type: actionTypes.handleClick,
    e
});

export const reset = () => ({
    type: actionTypes.reset
})

export const pause = () => ({
    type: actionTypes.pause
})

export const exit = () => ({
    type: actionTypes.exit
})

export const showOpenFileDialog = () => ({
    type: actionTypes.showOpenFileDialog
})
