// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn update_display(display: &str, label: &str, clear: bool) -> String {
    if clear {
        println!("Clear!");
        return String::new();
    }

    let op = "+-/*%";
    let labels: Vec<char> = display.chars().collect();
    for i in op.chars() {
        if labels.last() == Some(&((i as u8) as char)) {
            if op.contains(label) {
                return String::from(display);
            }
        }
    }

    format!("{}{}", display, label)
}

#[tauri::command]
fn result(display: &str) -> String {
    if display == "" {
        return String::new();
    }

    let update = display.replace(|c: char| c == '%', "/100.0");
    match meval::eval_str(update) {
        Ok(resultado) => resultado.to_string(),
        Err(erro) => {
            eprintln!("{}", erro);
            String::from("NaN")
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![update_display, result])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
