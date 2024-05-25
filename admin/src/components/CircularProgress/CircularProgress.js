import './CircularProgress.css';

const CircularProgressItem = ({ isFetching, isTransparent }) => {
    return (
        <div className={`progress ${isTransparent ? 'transparent' : ''}`} style={ isFetching ? { opacity: 1, zIndex: 1 } : { opacity: 0, zIndex: -1 }}>
            <div class="circular-progress" style={{ display: isFetching ? 'block' : 'none' }}>
                <div class="circular-progress__circle"></div>
                <div class="circular-progress__circle circular-progress__circle--delay"></div>
            </div>
        </div>
    );
};

export default CircularProgressItem;
