import styles from './Loading.module.css';
import img from './img_loading.svg';

function Loading({ inline = false, size }){
    const imageStyle = size ? { width: size, height: size } : {};
    
    return(
        <div className={inline ? styles.loading_inline : styles.loading_container}>
            <img src={img} alt="loading image" style={imageStyle} />
        </div>
    )
}

export default Loading;
