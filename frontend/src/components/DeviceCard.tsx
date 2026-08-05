import { Device } from "@/lib/types";

type DeviceCardProps = {
    device: Device;
};

export function DeviceCard({ device }: DeviceCardProps) {
    const voltBat = device.current_state.find((m) => m.metric_key === "Bateria");
    const tempInterna = device.current_state.find((m) => m.metric_key === "TempC_SHT");
    const umidInterna = device.current_state.find((m) => m.metric_key === "Hum_SHT");
    const tempExterna = device.current_state.find((m) => m.metric_key === "Ext_TempC_SHT");
    const umidExterna = device.current_state.find((m) => m.metric_key === "Ext_Hum_SHT")

    return (
        <div className="bg-surface rounded-xl shadow-sm border border-border p-5">
            <h2 className="text-lg font-bold text-brand-light mb-4">{device.name}</h2>

            <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface-muted rounded-lg p-3">
                    <p className="text-xs text-muted mb-1">{tempInterna ?.label}</p>
                    <p className="text-2xl font-bold text-foreground">
                        {tempInterna ?.value}
                        <span className="text-sm font-normal text-muted ml-1">{tempInterna ?.unit}</span>
                    </p>
                </div>
                <div className="bg-surface-muted rounded-lg p-3">
                    <p className="text-xs text-muted mb-1">{umidInterna ?.label}</p>
                    <p className="text-2xl font-bold text-foreground">
                        {umidInterna ?.value}
                        <span className="text-sm font-normal text-muted ml-1">{umidInterna ?.unit}</span>
                    </p>
                </div>
                <div className="bg-surface-muted rounded-lg p-3">
                    <p className="text-xs text-muted mb-1">{tempExterna ?.label}</p>
                    <p className="text-2xl font-bold text-foreground">
                        {tempExterna ?.value}
                        <span className="text-sm font-normal text-muted ml-1">{tempExterna ?.unit}</span>
                    </p>
                </div>
                <div className="bg-surface-muted rounded-lg p-3">
                    <p className="text-xs text-muted mb-1">{umidExterna ?.label}</p>
                    <p className="text-2xl font-bold text-foreground">
                        {umidExterna ?.value}
                        <span className="text-sm font-normal text-muted ml-1">{umidExterna ?.unit}</span>
                    </p>
                </div>
                <div className="bg-surface-muted rounded-lg p-3">
                    <p className="text-xs text-muted mb-1">{voltBat ?.label}</p>
                    <p className="text-2xl font-bold text-foreground">
                        {voltBat ?.value}
                        <span className="text-sm font-normal text-muted ml-1">{voltBat ?.unit}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}