import api from '../../../../Services/api'

export default function CandidateCV({
  cvFile,
  setCvFile,
  uploadingCv,
  setUploadingCv,
  error,
  setError,
}) {
  const handleUploadCv = async () => {
    if (!cvFile) {
      setError('Seleccioná un archivo PDF.')
      return
    }

    try {
      setUploadingCv(true)
      setError('')

      const formData = new FormData()

      formData.append('cv', cvFile)

      const result = await api.post('/User/cv', formData)

      console.log('CV subido:', result)

      setCvFile(null)

    } catch (err) {
      console.error('Error subiendo CV:', err)

      setError(
        err.message || 'No se pudo subir el CV.'
      )
    } finally {
      setUploadingCv(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow p-4 sm:p-6 border border-gray-200">

      <div>
        <h2 className="font-display text-2xl font-semibold text-[#1f2a33]">
          Currículum
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Subí tu currículum para utilizarlo en tus postulaciones.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-4">

        <input
          type="file"
          accept=".pdf"
          onChange={e =>
            setCvFile(e.target.files[0] || null)
          }
          disabled={uploadingCv}
          className="block w-full text-sm text-slate-600
                     file:mr-4 file:rounded-lg file:border-0
                     file:bg-[#355872] file:px-4 file:py-2
                     file:text-white hover:file:bg-[#2b475c]"
        />

        {cvFile && (
          <p className="text-sm text-slate-600">
            Archivo seleccionado:{' '}
            <strong>{cvFile.name}</strong>
          </p>
        )}

        <button
          onClick={handleUploadCv}
          disabled={!cvFile || uploadingCv}
          className="w-full sm:w-auto self-start rounded-lg
                     bg-[#355872] px-5 py-2 text-white font-medium
                     hover:bg-[#2b475c]
                     transition-colors duration-200
                     disabled:opacity-50"
        >
          {uploadingCv ? 'Subiendo...' : 'Subir CV'}
        </button>

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}

      </div>
    </div>
  )
}