import api from '../../../../Services/api'

export default function CandidateCV({
  cvFile,
  setCvFile,
  uploadingCv,
  setUploadingCv,
  error,
  setError,
}) {
  const [cvSuccess, setCvSuccess] = useState('')

  const handleUploadCv = async () => {
    if (!cvFile) {
      setError('Seleccioná un archivo PDF.')
      setCvSuccess('')
      return
    }

    try {
      setUploadingCv(true)
      setError('')
      setCvSuccess('')

      const formData = new FormData()
      formData.append('cv', cvFile)

      const result = await api.post('/User/cv', formData)

      console.log('CV subido:', result)

      setCvFile(null)

      // Mensaje de éxito
      setCvSuccess('¡CV subido correctamente!')
    } catch (err) {
      console.error('Error subiendo CV:', err)

      setError(err.message || 'No se pudo subir el CV.')
      setCvSuccess('')
    } finally {
      setUploadingCv(false)
    }
  }

  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card p-4 shadow-sm sm:p-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-brand-title">
          Currículum
        </h2>

        <p className="mt-1 text-sm text-brand-muted">
          Subí tu currículum para utilizarlo en tus postulaciones.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <input
          type="file"
          accept=".pdf"
          onChange={e => {
            setCvFile(e.target.files[0] || null)
            setCvSuccess('')
            setError('')
          }}
          disabled={uploadingCv}
          className="block w-full text-sm text-brand-muted
                     file:mr-4 file:rounded-lg file:border-0
                     file:bg-brand-accent file:px-4 file:py-2
                     file:text-white hover:file:opacity-90
                     disabled:cursor-not-allowed"
        />

        {cvFile && (
          <p className="text-sm text-brand-muted">
            Archivo seleccionado:{' '}
            <strong className="text-brand-title">
              {cvFile.name}
            </strong>
          </p>
        )}

        <button
          onClick={handleUploadCv}
          disabled={!cvFile || uploadingCv}
          className="self-start w-full rounded-lg
                     bg-brand-accent px-5 py-2 font-medium text-white
                     transition-opacity duration-200
                     hover:opacity-90
                     disabled:cursor-not-allowed disabled:opacity-50
                     sm:w-auto"
        >
          {uploadingCv ? 'Subiendo...' : 'Subir CV'}
        </button>

        {/* Éxito */}
        {cvSuccess && (
          <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            ✓ {cvSuccess}
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}