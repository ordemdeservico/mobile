export interface OrderService {
  id: number;
  solicitante_id: number;
  data_solicitacao: string;
  descricao: string;
  setor_principal_id: number;
  setor_secundario_id: number;
  status_os: string;
  nivel_prioridade?: string;
  servico_terceirizado?: number;
  tipo_servico_id?: number;
  tecnico_id?: number;
  data_final?: string;
  material?: string;
  relatorio?: string;
  feedback?: string;
  solicitante_nome?: string;
  solicitante_email?: string;
  tecnico_nome?: string;
  setor_principal_nome?: string;
  setor_secundario_com_bloco?: string;
  setor_secundario_bloco?: any;
  tipo_servico_nome?: string;
  images?: ImageOS;
}

export interface ImageOS {
  type1?: [{
    id: number;
    os_id: number;
    img_key: string;
    img_type: string;
  }];
  type2?: [{
    id: number;
    os_id: number;
    img_key: string;
    img_type: string;
  }];
}


export interface ConcludeOS {
  ordem_servico_id: number;
  data_final: Date | string;
  material: string;
  relatorio: string;
  files: File;
}

export interface ConcludeOsResponse {
  message: string;
  ordem_servico_id: number;
  data_final: Date | string;
  material: string;
  status: string;
  uploadResponse: any;
}
